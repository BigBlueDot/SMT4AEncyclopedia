/**
 * Created by bigbl on 2/20/2017.
 */
import React, {PropTypes} from 'react';

class DemonDisplay extends React.Component {
  render() {
    const demon = this.props.demon;

    const drawStatList = (name) => (<dl key={name} class="dl-horizontal">
      <dt>{name}</dt>
      <dd>{demon[name]}</dd>
    </dl>);
    const drawStat = (name) => (<div key={name}>
      <div className="col-md-6 text-right">{name}</div>
      <div className="col-md-6 text-left">{demon[name]}</div>
    </div>);

    const stats = ["Level", "Race", "HP", "MP", "Strength", "Dexterity", "Magic", "Agility", "Luck"];
    const statDivs = stats.map((name) => drawStat(name));

    return (<div>
      <h2>{demon.Name}</h2>
      <div className="panel panel-default">
        <div className="panel-body">
          {statDivs}
        </div>
      </div>
    </div>)
  }
}

DemonDisplay.propTypes = {
  demon: PropTypes.object.isRequired,
};

export default DemonDisplay;
