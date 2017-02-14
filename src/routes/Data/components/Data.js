/**
 * Created by bigbl on 12/14/2016.
 */
import React from 'react';
import {Line} from 'react-chartjs';
import demon from '../../../data/demon.json';

const getDataObject = (dataLabel, labels, data) => {
  return {
    labels: labels,
    datasets: [
      {
        label: dataLabel,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data,
        spanGaps: false,
      }
    ]
  }
};

const getLevelLabels = (demons) => {
  // find and min max level
  let min = 1;
  let max = 99;

   // generate label list
  let levels = [];
  for (var i=min; i<=max; i++) {
    levels.push(i.toString());
  }

  return levels;
};

const getValuesForLevel = (demons, levelLabels, statName) => {
   // create empty array for each level
  let fullData = {};
  levelLabels.forEach((l) => {
    fullData[l] = [];
  });

  // go through each demon and categorize the level
  demons.forEach((d) => {
    if (fullData[d.Level.toString()]) fullData[d.Level.toString()].push(d[statName]);
  });

  return fullData;
};

const getAverageValueForLevel = (levelValues) => {
  // go through and get the average for each level
  let results = {};
  Object.keys(levelValues).forEach((key) => {
    const values = levelValues[key];
    let sum = 0;
    values.forEach((v) => {
      sum += v;
    });

    const avg = sum / values.length;
    results[key] = isNaN(avg) ? 0 : sum / values.length;
  });

  return results;
};

const convertToArray = (values) => {
  let results = [];
  Object.keys(values).forEach((key) => {
    results[parseInt(key)] = values[key];
  });
  return results;
};

const getMovingAverage = (data, legSize) => {
  // get the moving average 1-1 with the data by gradually increasing the window size
  let results = [];

  // verify that the windowSize works with the length of data passed in
  if ((legSize * 2 + 1) > data.length) {
    return data;
  };

  // get the data from the beginning
  for (var i=0; i<=legSize; i++) {
    let currentValue = 0;
    for (var j=1; j <= i * 2; j++) {
      currentValue += parseFloat(data[j]);
    }
    results[i] = currentValue / (i + 1);
  }

  // get the middle data
  for (var i=legSize + 1; i < data.length - legSize; i++) {
    let currentValue = 0;
    for (var j=i - legSize; j <= i + legSize; j++) {
      currentValue += data[j];
    }
    results[i] = currentValue / (legSize * 2 + 1)
  }

  // get the end data
  for (var i=data.length - legSize; i<data.length; i++) {
    let currentValue = 0;
    for (var j=i - (data.length - i - 1); j < data.length; j++) {
      currentValue += data[j];
    }
    results[i] = currentValue / ((data.length - i - 1) * 2 + 1);
  }

  return results;
};

export const Data = (props) => {
  const demons = demon.demons;
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
  const hpData = getDataObject("HP", levelLabels, hpMovingAvg);
  const mpData = getDataObject("MP", levelLabels, mpMovingAvg);
  const strengthData = getDataObject("Strength", levelLabels, strengthMovingAvg);
  const dexterityData = getDataObject("Dexterity", levelLabels, dexterityMovingAvg);
  const magicData = getDataObject("Magic", levelLabels, magicMovingAvg);
  const agilityData = getDataObject("Agility", levelLabels, agilityMovingAvg);
  const luckData = getDataObject("Luck", levelLabels, luckMovingAvg);

  // Draw the charts
  return (
    <div style={{margin: '0 auto'}}>
      HP:
      <Line width="600" height="300" data={hpData}/>
      MP:
      <Line width="600" height="300"  data={mpData}/>
      Strength:
      <Line width="600" height="300"  data={strengthData}/>
      Dexterity:
      <Line width="600" height="300"  data={dexterityData}/>
      Magic:
      <Line width="600" height="300"  data={magicData}/>
      Agility:
      <Line width="600" height="300"  data={agilityData}/>
      Luck:
      <Line width="600" height="300"  data={luckData}/>
    </div>
  );
};

Data.propTypes = {
};

export default Data;
