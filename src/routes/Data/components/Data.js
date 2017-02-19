/**
 * Created by bigbl on 12/14/2016.
 */
import React from 'react';
import {Line} from 'react-chartjs';

const options = {
  pointDot: false,
  showTooltips: false
};

const getDataObject = (dataLabel, labels, data) => {
  return {
    labels: labels,
    datasets: [
      {
        label: dataLabel,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(5,255,5,0.4)",
        borderColor: "rgba(75,192,192,1)",
        fillColor: "rgba(5,255,5,0.4)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        data: data,
        spanGaps: false,
        radius: 0
      }
    ]
  }
};

const skipLevelLabels = (levelLabels) => {
  let newLabels = levelLabels.map((label) => {
    if (parseInt(label) % 5 === 0) {
      return label;
    }
    else {
      return "";
    }
  });
  return newLabels;
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

    const hpData = getDataObject("HP", skippedLabels, hpMovingAvg);
    const mpData = getDataObject("MP", skippedLabels, mpMovingAvg);
    const strengthData = getDataObject("Strength", skippedLabels, strengthMovingAvg);
    const dexterityData = getDataObject("Dexterity", skippedLabels, dexterityMovingAvg);
    const magicData = getDataObject("Magic", skippedLabels, magicMovingAvg);
    const agilityData = getDataObject("Agility", skippedLabels, agilityMovingAvg);
    const luckData = Object.assign({}, getDataObject("Luck", skippedLabels, luckMovingAvg));

    const getDataLength = (data) => (data.datasets && data.datasets[0].data) ? data.datasets[0].data.length : 0;

    const displayChart = (header, key, data, options) => (<div className="panel panel-primary">
        <div className="panel-heading">
          <h3>{header}:</h3>
        </div>
        <div className="panel-body">
          <Line key={key} width="700" height="300" data={data} options={options}/>
        </div>
      </div>);

    // Draw the charts
    return (
      <div style={{margin: '0 auto'}}>
        <h2>Stats by Level</h2>
        <h2>Moving Averages of Stats by Level</h2>
        <hr></hr>
        {displayChart("HP", "HP" + getDataLength(hpData), hpData, options)}
        {displayChart("MP", "MP" + getDataLength(mpData), mpData, options)}
        {displayChart("Strength", "Strength" + getDataLength(strengthData), strengthData, options)}
        {displayChart("Dexterity", "Dexterity" + getDataLength(dexterityData), dexterityData, options)}
        {displayChart("Magic", "Magic" + getDataLength(magicData), magicData, options)}
        {displayChart("Agility", "Agility" + getDataLength(agilityData), agilityData, options)}
        {displayChart("Luck", "Luck" + getDataLength(luckData), luckData, options)}
      </div>
    );
  }
}

Data.propTypes = {
  levelLabels: React.PropTypes.array,
  movingAverages: React.PropTypes.object,
  loadMovingAvgStats: React.PropTypes.func.isRequired,
  loadLevelLabels: React.PropTypes.func.isRequired
};

export default Data;
