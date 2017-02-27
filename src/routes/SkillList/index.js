/**
 * Created by bigbl on 2/26/2017.
 */
import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path : 'skill-list',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const SkillList = require('./containers/SkillListContainer').default;
      const reducer = require('./modules/skillList').default;

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'skillList', reducer });

      /*  Return getComponent   */
      cb(null, SkillList);

      /* Webpack named bundle   */
    }, 'skillList');
  }
});
