/**
 * Created by bigbl on 2/26/2017.
 */
import React from 'react';
import skill from '../../../data/skill.json';
import Griddle from 'griddle-react';
import { Link } from 'react-router';

const columnMetadata = [{
  columnName: "SkillName",
  displayName: "SkillName",
  sortable: true,
},{
  columnName: "SkillType",
  displayName: "SkillType",
  sortable: true,
},{
  columnName: "Description",
  displayName: "Description",
  sortable: true,
},{
  columnName: "SecondarySkillType",
  displayName: "Secondary",
  sortable: true,
},{
  columnName: "SmirkEffect",
  displayName: "Smirk Effect",
  sortable: true,
},{
  columnName: "Target",
  displayName: "Target",
  sortable: true,
},{
  columnName: "IsUnique",
  displayName: "IsUnique",
  sortable: true,
}];

export const SkillList = (props) => {
  return (
    <div style={{ margin: '0 auto' }} >
      <Griddle
        results={skill.skills}
        enableInfiniteScroll={true}
        bodyHeight={400}
        useFixedHeader={true}
        showFilter={true}
        columnMetadata={columnMetadata} />
    </div>
  );
};

SkillList.propTypes = {
};

export default SkillList;
