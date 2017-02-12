/**
 * Created by bigbl on 12/14/2016.
 */
import React from 'react';
import demon from '../../../data/demon.json';
import Griddle from 'griddle-react';

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
