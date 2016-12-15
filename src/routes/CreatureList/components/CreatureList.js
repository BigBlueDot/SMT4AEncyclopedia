/**
 * Created by bigbl on 12/14/2016.
 */
import React from 'react';
import demon from '../../../data/demon.json';

export const CreatureList = (props) => {
  let creatures = [];
  let index = 0;
  demon.demons.forEach((d) => {
    index++;
    creatures.push(<p key={index}>{d.Name}</p>);
  });
  return (
    <div style={{ margin: '0 auto' }} >
      {creatures}
    </div>
  );
}

CreatureList.propTypes = {
};

export default CreatureList;
