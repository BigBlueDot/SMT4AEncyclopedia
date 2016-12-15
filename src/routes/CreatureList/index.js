/**
 * Created by bigbl on 12/14/2016.
 */
import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path : 'creature-list',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const CreatureList = require('./containers/CreatureListContainer').default;
      const reducer = require('./modules/creatureList').default;

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'creatureList', reducer });

      /*  Return getComponent   */
      cb(null, CreatureList);

      /* Webpack named bundle   */
    }, 'creatureList');
  }
});
