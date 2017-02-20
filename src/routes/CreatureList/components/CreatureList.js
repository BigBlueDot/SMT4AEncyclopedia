/**
 * Created by bigbl on 12/14/2016.
 */
import React from 'react';
import demon from '../../../data/demon.json';
import Griddle from 'griddle-react';

const quartiles = {
  TOP: 'TOP',
  UPPER: 'UPPER',
  LOWER: 'LOWER',
  BOTTOM: 'BOTTOM'
};

const colors = {
  [quartiles.TOP]: '#0000AA',
  [quartiles.UPPER]: '#00AAAA',
  [quartiles.LOWER]: '#AAAAAA',
  [quartiles.BOTTOM]: '#FEFEFE',
};

const getColorForHP = (level, value) => {
  /*Upper Equation: y = 8.7x + 79.67
  Center Equation: y = 7.64x + 61.27
  Lower Equation: y = 6.5x + 52.95*/
  if (value > 8.7 * level + 79.67) return colors[quartiles.TOP];
  else if (value > 7.64 * level + 61.27) return colors[quartiles.UPPER];
  else if (value > 6.5 * level + 52.95) return colors[quartiles.LOWER];
  else return colors[quartiles.BOTTOM];
};

const CustomHPColumn = ({value}) => {
  return <span style={{ color: '#0000AA' }}>{value}</span>;
};

const columnMetadata = [{
  columnName: "Name",
  displayName: "Name",
  sortable: true,
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
  customCompareFn: function(item) {
    return parseFloat(item);
  }
},{
  columnName: "MP",
  displayName: "MP",
  sortable: true,
  customCompareFn: function(item) {
    return parseFloat(item);
  }
},{
  columnName: "Strength",
  displayName: "Strength",
  sortable: true,
  customCompareFn: function(item) {
    return parseFloat(item);
  }
},{
  columnName: "Dexterity",
  displayName: "Dexterity",
  sortable: true,
  customCompareFn: function(item) {
    return parseFloat(item);
  }
},{
  columnName: "Magic",
  displayName: "Magic",
  sortable: true,
  customCompareFn: function(item) {
    return parseFloat(item);
  }
},{
  columnName: "Agility",
  displayName: "Agility",
  sortable: true,
  customCompareFn: function(item) {
    return parseFloat(item);
  }
},{
  columnName: "Luck",
  displayName: "Luck",
  sortable: true,
  customCompareFn: function(item) {
    return parseFloat(item);
  }
}];

export const CreatureList = (props) => {
  return (
    <div style={{ margin: '0 auto' }} >
      <Griddle
        results={demon.demons}
        enableInfiniteScroll={true}
        bodyHeight={400}
        useFixedHeader={true}
        showFilter={true}
        columnMetadata={columnMetadata} />
    </div>
  );
}

CreatureList.propTypes = {
};

export default CreatureList;
