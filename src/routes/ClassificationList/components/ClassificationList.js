/**
 * Created by bigbl on 3/4/2017.
 */
import React from 'react';
import demon from '../../../data/demon.json';
import Griddle from 'griddle-react';
import { Link } from 'react-router';

const quartiles = {
  TOP: 'TOP',
  UPPER: 'UPPER',
  LOWER: 'LOWER',
  BOTTOM: 'BOTTOM'
};

const colors = {
  [quartiles.TOP]: '#006400',
  [quartiles.UPPER]: '#98fb98',
  [quartiles.LOWER]: '#ffb6c1',
  [quartiles.BOTTOM]: '#ff0000',
};

const getColorForStat = (level, value, {upperB, upperM, centerB, centerM, lowerB, lowerM}) => {
  /*Upper Equation: y = 8.7x + 79.67
   Center Equation: y = 7.64x + 61.27
   Lower Equation: y = 6.5x + 52.95*/
  if (value > upperM * level + upperB) return colors[quartiles.TOP];
  else if (value > centerM * level + centerB) return colors[quartiles.UPPER];
  else if (value > lowerM * level + lowerB) return colors[quartiles.LOWER];
  else return colors[quartiles.BOTTOM];
};

const CustomStatColumn = ({data, metadata, rowData}) => {
  const color = getColorForStat(rowData.Level, data, metadata);
  return <span style={{ color: color }}>{data}</span>;
};

const CustomNameColumn = ({data, metadata, rowData}) => {
  return (<span>
    <Link to={'/demon-display/' + data}>
      {data}
    </Link>
  </span>);
};

const columnMetadata = [{
  columnName: "Name",
  displayName: "Name",
  sortable: true,
  customComponent: CustomNameColumn,
},{
  columnName: "Level",
  displayName: "Level",
  sortable: true,
  customCompareFn: function(item) {
    return parseFloat(item);
  }
},{
  columnName: "Race",
  displayName: "Race",
  sortable: true,
},{
  columnName: "HP",
  displayName: "HP",
  sortable: true,
  upperM: 8.7,
  upperB: 79.67,
  centerM: 7.64,
  centerB: 61.27,
  lowerM: 6.5,
  lowerB: 52.95,
  customComponent: CustomStatColumn,
  customCompareFn: function(item) {
    return parseFloat(item);
  }
},{
  columnName: "MP",
  displayName: "MP",
  sortable: true,
  upperM: 4.86,
  upperB: 43.88,
  centerM: 3.89,
  centerB: 32.34,
  lowerM: 3.1,
  lowerB: 26.57,
  customComponent: CustomStatColumn,
  customCompareFn: function(item) {
    return parseFloat(item);
  }
},{
  columnName: "Strength",
  displayName: "Strength",
  sortable: true,
  upperM: 1.31,
  upperB: 7.58,
  centerM: 1.03,
  centerB: 4.93,
  lowerM: 0.7,
  lowerB: 6.59,
  customComponent: CustomStatColumn,
  customCompareFn: function(item) {
    return parseFloat(item);
  }
},{
  columnName: "Dexterity",
  displayName: "Dexterity",
  sortable: true,
  upperM: 1.07,
  upperB: 10,
  centerM: 0.91,
  centerB: 6.31,
  lowerM: 0.79,
  lowerB: 6.69,
  customComponent: CustomStatColumn,
  customCompareFn: function(item) {
    return parseFloat(item);
  }
},{
  columnName: "Magic",
  displayName: "Magic",
  sortable: true,
  upperM: 1.43,
  upperB: 4.35,
  centerM: 1.2,
  centerB: 0.37,
  lowerM: 0.85,
  lowerB: 1.06,
  customComponent: CustomStatColumn,
  customCompareFn: function(item) {
    return parseFloat(item);
  }
},{
  columnName: "Agility",
  displayName: "Agility",
  sortable: true,
  upperM: 1.13,
  upperB: 9.49,
  centerM: 0.99,
  centerB: 8,
  lowerM: 0.92,
  lowerB: 5.43,
  customComponent: CustomStatColumn,
  customCompareFn: function(item) {
    return parseFloat(item);
  }
},{
  columnName: "Luck",
  displayName: "Luck",
  sortable: true,
  upperM: 1.14,
  upperB: 7.63,
  centerM: 1.08,
  centerB: 6.39,
  lowerM: 1,
  lowerB: 5.28,
  customComponent: CustomStatColumn,
  customCompareFn: function(item) {
    return parseFloat(item);
  }
},{
  columnName: "SkillRank",
  displayName: "Skill",
  sortable: true,
  upperM: .24,
  upperB: 8.85,
  centerM: 0.25,
  centerB: 5.58,
  lowerM: 0.21,
  lowerB: 3.05,
  customComponent: CustomStatColumn,
  customCompareFn: function(item) {
    return parseFloat(item);
  }
},{
  columnName: "Growth",
  displayName: "Growth",
  sortable: true,
  upperM: .24,
  upperB: 8.38,
  centerM: .25,
  centerB: 5,
  lowerM: .21,
  lowerB: 2.56,
  customComponent: CustomStatColumn,
  customCompareFn: function(item) {
    return parseFloat(item);
  }
}];

export const ClassificationList = (props) => {
  const demons = demon.demons.map((demon) => {
    let SkillRank = 0;
    let Growth = 0;

    demon.Skills.forEach((skill) => {
      if (skill.LevelDiff === 0) {
        SkillRank = SkillRank > skill.Rank ? SkillRank : skill.Rank;
      }
      else {
        Growth = Growth > skill.Rank ? Growth : skill.Rank;
      }
    });

    return {
      ...demon,
      SkillRank: SkillRank,
      Growth: Growth,
    }
  });

  return (
    <div style={{ margin: '0 auto' }} >
      <Griddle
        results={demons}
        enableInfiniteScroll={true}
        bodyHeight={400}
        useFixedHeader={true}
        showFilter={true}
        columns={["Name", "Level", "Race", "HP", "MP", "Strength", "Dexterity", "Magic", "Agility", "Luck", "SkillRank", "Growth"]}
        columnMetadata={columnMetadata} />
    </div>
  );
}

ClassificationList.propTypes = {
};

export default ClassificationList;
