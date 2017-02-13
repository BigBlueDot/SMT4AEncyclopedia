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

  // Get data object for each stat
  const hpData = getDataObject("HP", levelLabels, hpAvg);
  const mpData = getDataObject("MP", levelLabels, mpAvg);
  const strengthData = getDataObject("Strength", levelLabels, strengthAvg);
  const dexterityData = getDataObject("Dexterity", levelLabels, dexterityAvg);
  const magicData = getDataObject("Magic", levelLabels, magicAvg);
  const agilityData = getDataObject("Agility", levelLabels, agilityAvg);
  const luckData = getDataObject("Luck", levelLabels, luckAvg);

  // Draw the charts
  return (
    <div style={{margin: '0 auto'}}>
      <Line data={hpData}/>
      <Line data={mpData}/>
      <Line data={strengthData}/>
      <Line data={dexterityData}/>
      <Line data={magicData}/>
      <Line data={agilityData}/>
      <Line data={luckData}/>
    </div>
  );
};

Data.propTypes = {
};

export default Data;
