/**
 * Created by bigbl on 12/14/2016.
 */
import React from 'react';
import {ScatterChart, Scatter, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import regression from 'regression';

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

const getQuartileRegression = (data) => {
  const checkedData = data || [];
  const regressionResult = regression('linear', checkedData.map((d) => [d.x, d.y]));
  const upperData = checkedData.filter((dp) => dp.y > dp.x * regressionResult.equation[0] + regressionResult.equation[1]);
  const lowerData = checkedData.filter((dp) => dp.y <= dp.x * regressionResult.equation[0] + regressionResult.equation[1]);
  const upperRegressionResult = regression('linear', upperData.map((d) => [d.x, d.y]));
  const lowerRegressionResult = regression('linear', lowerData.map((d) => [d.x, d.y]));

  const upperRegression = {
    equation: upperRegressionResult.string,
    points: [{
      x: 0, y: upperRegressionResult.equation[1]
    }, {
      x: 100, y: (upperRegressionResult.equation[0] * 100 + upperRegressionResult.equation[1])
    }]
  };
  const centerRegression = {
    equation: regressionResult.string,
    points: [{
      x: 0, y: regressionResult.equation[1]
    }, {
      x: 100, y: (regressionResult.equation[0] * 100 + regressionResult.equation[1])
    }]
  };
  const lowerRegression = {
    equation: lowerRegressionResult.string,
    points: [{
      x: 0, y: lowerRegressionResult.equation[1]
    }, {
      x: 100, y: (lowerRegressionResult.equation[0] * 100 + lowerRegressionResult.equation[1])
    }]
  };

  return {
    upperRegression, centerRegression, lowerRegression
  };
};

const getRegression = (data) => {
  const regressionTest = data || [];
  const regressionResult = regression('linear', regressionTest.map((d) => [d.x, d.y]));

  return [{
    x: 0, y: regressionResult.equation[1]
  }, {
    x: 100, y: (regressionResult.equation[0] * 100 + regressionResult.equation[1])
  }];
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
    props.loadSkillRanks();
    props.loadLearnedSkillRanks();
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

    const displayScatterChart = (header, key, data, regressionData) => {
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
              <ul className="list-group">
                <li className="list-group-item">Upper Equation: {regressionData.upperRegression.equation}</li>
                <li className="list-group-item">Center Equation: {regressionData.centerRegression.equation}</li>
                <li className="list-group-item">Lower Equation: {regressionData.lowerRegression.equation}</li>
              </ul>
              <ScatterChart width={700} height={300}>
                <XAxis dataKey={'x'} name='level' unit='cm'/>
                <YAxis dataKey={'y'} name={header}/>
                <Scatter data={data} fill='#8884d8'/>
                <CartesianGrid />
                <Scatter data={regressionData.upperRegression.points} style={{strokeWidth: "4px"}} fill='#ff0000' line />
                <Scatter data={regressionData.centerRegression.points} style={{strokeWidth: "4px"}} fill='#82ca9d' line />
                <Scatter data={regressionData.lowerRegression.points} style={{strokeWidth: "4px"}} fill='#ff0000' line />
              </ScatterChart>
            </center>
          </div>
        </div>)
      }
    };

    const getStatsKey = (statName, data) => "statsByLevel" + statName + getDataLength(data);
    const statsByLevelCollection = stats.map((statName) => {
      const statByLevel = getStatsByLevel(props, statName);
      return displayScatterChart(statName,
        getStatsKey(statName, getStatsByLevel(props, statName)),
        statByLevel,
        getQuartileRegression(statByLevel))
    });

    // Draw the charts
    return (
      <div style={{margin: '0 auto'}}>
        <h2>Stats by Level</h2>
        <hr />
        {statsByLevelCollection}
        {displayScatterChart("Skill Rank", getStatsKey("SkillRank", props.skillRankData), props.skillRankData,
          getQuartileRegression(props.skillRankData))}
        {displayScatterChart("Learned Skill Rank", getStatsKey("LearnedSkillRank", props.learnedSkillRankData), props.learnedSkillRankData,
          getQuartileRegression(props.learnedSkillRankData))}
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
