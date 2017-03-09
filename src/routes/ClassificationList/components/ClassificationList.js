/**
 * Created by bigbl on 3/4/2017.
 */
import React from 'react';
import demon from '../../../data/demon.json';
import Griddle from 'griddle-react';
import { Link } from 'react-router';
import clusterMaker from 'clusters';

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

const getRankForState = (level, value, {upperB, upperM, centerB, centerM, lowerB, lowerM}) => {
  if (value > upperM * level + upperB) return 1;
  else if (value > centerM * level + centerB) return 2;
  else if (value > lowerM * level + lowerB) return 3;
  else return 4;
};

const getColorForStat = (level, value, {upperB, upperM, centerB, centerM, lowerB, lowerM}) => {
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
},{
  columnName: "Cluster",
  displayName: "Cluster",
  sortable: true,
  customCompareFn: function(item) {
    return parseFloat(item);
  }
}];

const properties = ["Level", "HP", "MP", "SkillRank", "Growth", "Strength", "Dexterity", "Magic", "Agility", "Luck"];

const calculateDistance = (demonOne, demonTwo) => {
  let sum = 0;
  properties.forEach((p) => {
    sum += Math.pow(demonTwo[p] - demonOne[p], 2)
  });
  return Math.sqrt(sum)
};

const calculateClassifierDistance = (demonOne, demonTwo) => {
  // data is in array format, so just calculate that
  let sum = 0;
  for (let i=0; i<demonOne.length; i++) {
    sum += Math.pow(demonTwo[i] - demonOne[i], 2)
  }
  return Math.sqrt(sum);
};

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

  let primarySkillTypes = [];
  let secondarySkillTypes = [];
  demons.forEach((demon) => {
    demon.Skills.forEach((s) => {
      if (!primarySkillTypes.includes(s.SkillType)) primarySkillTypes.push(s.SkillType);
      if (!secondarySkillTypes.includes(s.SecondarySkillType)) secondarySkillTypes.push(s.SecondarySkillType);
    });
  });

  const classifiers = columnMetadata.filter((cmd) => properties.includes(cmd.columnName));

  const mapDemonToClassifiers = (demon) => {
    let result = [];
    classifiers.forEach((c) => {
      result.push(getRankForState(demon.Level, demon[c.columnName], c));
    });
    primarySkillTypes.forEach((p) => {
      let count = 0;
      demons.forEach((demon) => {
        demon.Skills.forEach((s) => {
          if (s.SkillType === p) count++;
        })
      });
      result.push(count)
    });
    secondarySkillTypes.forEach((p) => {
      let count = 0;
      demons.forEach((demon) => {
        demon.Skills.forEach((s) => {
          if (s.SecondarySkillType === p) count++;
        })
      });
      result.push(count)
    });
    return result;
  };

  const data = demons.map(mapDemonToClassifiers);

  clusterMaker.k(5);
  clusterMaker.iterations(500);

  clusterMaker.data(data);

  const centroids = clusterMaker.clusters().map((f) => {
    return f.centroid;
  });

  const demonsWithCluster = demons.map((demon) => {
    let currentDistance = Number.MAX_SAFE_INTEGER;
    let currentIndex = -1;
    for (let i = 0; i < centroids.length; i++) {
      const c = centroids[i];
      const thisDistance = calculateClassifierDistance(mapDemonToClassifiers(demon), c);
      if (thisDistance < currentDistance) {
        currentDistance = thisDistance;
        currentIndex = i;
      }
    }

    return {
      ...demon,
      Cluster: currentIndex
    }
  });

  return (
    <div style={{ margin: '0 auto' }} >
      <Griddle
        results={demonsWithCluster}
        enableInfiniteScroll={true}
        bodyHeight={400}
        useFixedHeader={true}
        showFilter={true}
        columns={["Name", "Level", "Race", "HP", "MP", "Strength", "Dexterity", "Magic", "Agility", "Luck", "SkillRank", "Growth", "Cluster"]}
        columnMetadata={columnMetadata} />
    </div>
  );
}

ClassificationList.propTypes = {
};

export default ClassificationList;
