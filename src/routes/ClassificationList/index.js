/**
 * Created by bigbl on 3/4/2017.
 */
import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path : 'classification-list',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const ClassificationList = require('./containers/ClassificationListContainer').default;
      const reducer = require('./modules/classificationList').default;

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'classificationList', reducer });

      /*  Return getComponent   */
      cb(null, ClassificationList);

      /* Webpack named bundle   */
    }, 'classificationList');
  }
});
