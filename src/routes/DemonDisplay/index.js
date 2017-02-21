/**
 * Created by bigbl on 2/20/2017.
 */

import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path : 'demon-display/:name',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Data = require('./containers/DemonDisplayContainer').default;
      const reducer = require('./modules/demonDisplay').default;
      const actions = require('./modules/demonDisplay').actions;

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'demonDisplay', reducer });

      store.dispatch(actions.loadDemonByName(nextState.params.name));

      /*  Return getComponent   */
      cb(null, Data);

      /* Webpack named bundle   */
    }, 'demonDisplay');
  }
});
