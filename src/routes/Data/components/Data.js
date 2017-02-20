/**
 * Created by bigbl on 12/14/2016.
 */
import React from 'react';
import {ScatterChart, Scatter, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const options = {
  pointDot: false,
  showTooltips: false
};

const getDataObject = (data) => {
  let dataObject = data ? data.map((d, i) => {
    return {x:i, value: d};
  }) : [];

  dataObject[0] = {
    x:0, value: 0,
  };

  return dataObject;
};

const skipLevelLabels = (levelLabels) => {
  let skippedLabels = [];
  levelLabels.forEach((label) => {
    if (parseInt(label) % 5 === 0) {
      skippedLabels.push(label);
    }
  });
  return skippedLabels;
};

class Data extends React.Component {
  componentDidMount () {
    const props = this.props;
    props.loadLevelLabels();
    props.loadMovingAvgStats("HP");
    props.loadMovingAvgStats("MP");
    props.loadMovingAvgStats("Strength");
    props.loadMovingAvgStats("Dexterity");
    props.loadMovingAvgStats("Magic");
    props.loadMovingAvgStats("Agility");
    props.loadMovingAvgStats("Luck");
    props.loadStatsByLevel("HP");
    props.loadStatsByLevel("MP");
    props.loadStatsByLevel("Strength");
    props.loadStatsByLevel("Dexterity");
    props.loadStatsByLevel("Magic");
    props.loadStatsByLevel("Agility");
    props.loadStatsByLevel("Luck");
  }

  render() {
    const props = this.props;

    const levelLabels = props.levelLabels ? props.levelLabels : [];
    const hpMovingAvg = props.movingAverages ? props.movingAverages["HP"] : [];
    const mpMovingAvg = props.movingAverages ? props.movingAverages["MP"] : [];
    const strengthMovingAvg = props.movingAverages ? props.movingAverages["Strength"] : [];
    const dexterityMovingAvg = props.movingAverages ? props.movingAverages["Dexterity"] : [];
    const magicMovingAvg = props.movingAverages ? props.movingAverages["Magic"] : [];
    const agilityMovingAvg = props.movingAverages ? props.movingAverages["Agility"] : [];
    const luckMovingAvg = props.movingAverages ? props.movingAverages["Luck"] : [];
    const skippedLabels = skipLevelLabels(levelLabels);

    const hpData = getDataObject(hpMovingAvg);
    const mpData = getDataObject(mpMovingAvg);
    const strengthData = getDataObject(strengthMovingAvg);
    const dexterityData = getDataObject(dexterityMovingAvg);
    const magicData = getDataObject(magicMovingAvg);
    const agilityData = getDataObject(agilityMovingAvg);
    const luckData = getDataObject(luckMovingAvg);

    const stats = ["HP", "MP", "Strength", "Dexterity", "Magic", "Agility", "Luck"];

    const getStatsByLevel = (props, statName) => props.statsByLevel ? props.statsByLevel[statName] : [];

    const getDataLength = (data) => (data ? data.length : 0);

    const displayRechart = (header, key, data) => {
      if (data && data.length === 0) {
        return <div></div>
      }
      else {
        return (<div className="panel panel-primary">
            <div className="panel-heading">
              <h3>{header}:</h3>
            </div>
            <div className="panel-body">
              <center>
                <LineChart key={key} width={700} height={300}
                           data={data}>
                  <XAxis type="number" ticks={skippedLabels} dataKey="x"/>
                  <YAxis />
                  <CartesianGrid strokeDasharray="5 3"/>
                  <Line dot={false} type="monotone" dataKey="value" stroke="#82ca9d"/>
                </LineChart>
              </center>
            </div>
          </div>
        );
      }
    };

    const displayScatterChart = (header, key, data) => {
      if (!data || data.length === 0) {
        return <div key={"nostatdraw" + key}></div>
      }
      else {
        return (<div className="panel panel-primary" key={"div" + key}>
          <div className="panel-heading">
            <h3>{header}:</h3>
          </div>
          <div className="panel-body">
            <center>
              <ScatterChart width={700} height={300}>
                <XAxis dataKey={'x'} name='level' unit='cm'/>
                <YAxis dataKey={'y'} name={header}/>
                <Scatter data={data} fill='#8884d8'/>
                <CartesianGrid />
              </ScatterChart>
            </center>
          </div>
        </div>)
      }
    };

    const getStatsKey = (statName, data) => "statsByLevel" + statName + getDataLength(data);
    const statsByLevelCollection = stats.map((statName) => displayScatterChart(statName,
      getStatsKey(statName, getStatsByLevel(props, statName)),
      getStatsByLevel(props, statName)));

    // Draw the charts
    return (
      <div style={{margin: '0 auto'}}>
        <h2>Stats by Level</h2>
        <hr />
        {statsByLevelCollection}
        <h2>Moving Averages of Stats by Level</h2>
        <hr></hr>
        {displayRechart("HP", "HP" + getDataLength(hpData), hpData)}
        {displayRechart("MP", "MP" + getDataLength(mpData), mpData)}
        {displayRechart("Strength", "Strength" + getDataLength(strengthData), strengthData)}
        {displayRechart("Dexterity", "Dexterity" + getDataLength(dexterityData), dexterityData)}
        {displayRechart("Magic", "Magic" + getDataLength(magicData), magicData)}
        {displayRechart("Agility", "Agility" + getDataLength(agilityData), agilityData)}
        {displayRechart("Luck", "Luck" + getDataLength(luckData), luckData)}
      </div>
    );
  }
}

Data.propTypes = {
  levelLabels: React.PropTypes.array,
  movingAverages: React.PropTypes.object,
  statsByLevel: React.PropTypes.object,
  loadMovingAvgStats: React.PropTypes.func.isRequired,
  loadLevelLabels: React.PropTypes.func.isRequired,
  loadStatsByLevel: React.PropTypes.func.isRequired,
};

export default Data;
