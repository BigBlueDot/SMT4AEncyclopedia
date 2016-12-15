/**
 * Created by bigbl on 12/14/2016.
 */
import React from 'react';
import demon from '../../../data/demon.json';
import Griddle from 'griddle-react';

export const CreatureList = (props) => {
  return (
    <div style={{ margin: '0 auto' }} >
      <Griddle results={demon.demons} />
    </div>
  );
}

CreatureList.propTypes = {
};

export default CreatureList;
