/**
 * Created by bigbl on 12/14/2016.
 */
import React from 'react';
import {Line} from 'react-chartjs';
import demon from '../../../data/demon.json';

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

    // Draw the charts
    return (
      <div style={{margin: '0 auto'}}>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3>HP:</h3>
          </div>
          <div className="panel-body">
            <Line key={"HP" + getDataLength(hpData)} width="700" height="300" data={hpData} options={options}/>
          </div>
        </div>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3>MP:</h3>
          </div>
          <div className="panel-body">
            <Line key={"MP" + getDataLength(mpData)} width="700" height="300"  data={mpData} options={options}/>
          </div>
        </div>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3>
              Strength:</h3>
          </div>
          <div className="panel-body">
            <Line key={"Strength" + getDataLength(strengthData)} width="700" height="300"  data={strengthData} options={options}/>
          </div>
        </div>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3>
              Dexterity:</h3>
          </div>
          <div className="panel-body">
            <Line key={"Dexterity" + getDataLength(dexterityData)} width="700" height="300"  data={dexterityData} options={options}/>
          </div>
        </div>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3>
              Magic:</h3>
          </div>
          <div className="panel-body">
            <Line key={"Magic" + getDataLength(magicData)} width="700" height="300"  data={magicData} options={options}/>
          </div>
        </div>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3>
              Agility:</h3>
          </div>
          <div className="panel-body">
            <Line key={"Agility" + getDataLength(agilityData)} width="700" height="300"  data={agilityData} options={options}/>
          </div>
        </div>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3>
              Luck:</h3>
          </div>
          <div className="panel-body">
            <Line key={"Luck" + getDataLength(luckData)} width="700" height="300"  data={luckData} options={options}/>
          </div>
        </div>
      </div>
    );
  }
}
export const oldData = (props) => {
  /*const demons = demon.demons;
  // Get the level labels
  const levelLabels = getLevelLabels(demons);

  // Get values for each stat
  const hpValues = getValuesForLevel(demons, levelLabels, "HP");
  const mpValues = getValuesForLevel(demons, levelLabels, "MP");
  const strengthValues = getValuesForLevel(demons, levelLabels, "Strength");
  const dexterityValues = getValuesForLevel(demons, levelLabels, "Dexterity");
  const magicValues = getValuesForLevel(demons, levelLabels, "Magic");
  const agilityValues = getValuesForLevel(demons, levelLabels, "Agility");
  const luckValues = getValuesForLevel(demons, levelLabels, "Luck");

  // Get average values for each stat
  const hpAvg = getAverageValueForLevel(hpValues);
  const mpAvg = getAverageValueForLevel(mpValues);
  const strengthAvg = getAverageValueForLevel(strengthValues);
  const dexterityAvg = getAverageValueForLevel(dexterityValues);
  const magicAvg = getAverageValueForLevel(magicValues);
  const agilityAvg = getAverageValueForLevel(agilityValues);
  const luckAvg = getAverageValueForLevel(luckValues);

  // Convert each set of data to an array
  const hpArray = convertToArray(hpAvg);
  const mpArray = convertToArray(mpAvg);
  const strengthArray = convertToArray(strengthAvg);
  const dexterityArray = convertToArray(dexterityAvg);
  const magicArray = convertToArray(magicAvg);
  const agilityArray = convertToArray(agilityAvg);
  const luckArray = convertToArray(luckAvg);

  // Get a moving average for each state
  const hpMovingAvg = getMovingAverage(hpArray, 5);
  const mpMovingAvg = getMovingAverage(mpArray, 5);
  const strengthMovingAvg = getMovingAverage(strengthArray, 5);
  const dexterityMovingAvg = getMovingAverage(dexterityArray, 5);
  const magicMovingAvg = getMovingAverage(magicArray, 5);
  const agilityMovingAvg = getMovingAverage(agilityArray, 5);
  const luckMovingAvg = getMovingAverage(luckArray, 5);


  // Get data object for each stat
  const hpData = getDataObject("HP", skippedLabels, hpMovingAvg);
  const mpData = getDataObject("MP", skippedLabels, mpMovingAvg);
  const strengthData = getDataObject("Strength", skippedLabels, strengthMovingAvg);
  const dexterityData = getDataObject("Dexterity", skippedLabels, dexterityMovingAvg);
  const magicData = getDataObject("Magic", skippedLabels, magicMovingAvg);
  const agilityData = getDataObject("Agility", skippedLabels, agilityMovingAvg);
  const luckData = getDataObject("Luck", skippedLabels, luckMovingAvg);*/
};

Data.propTypes = {
  levelLabels: React.PropTypes.array,
  movingAverages: React.PropTypes.object,
  loadMovingAvgStats: React.PropTypes.func.isRequired,
  loadLevelLabels: React.PropTypes.func.isRequired
};

export default Data;
