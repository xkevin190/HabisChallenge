import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {AplicationReducer} from './AplicationReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  app: AplicationReducer,
});

const middleWare = applyMiddleware(ReduxThunk)(createStore);

export default middleWare(rootReducer);
