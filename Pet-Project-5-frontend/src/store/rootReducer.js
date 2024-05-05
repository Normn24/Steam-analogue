import { combineReducers } from 'redux';
import filterReducer from './filterSlice'; 

const rootReducer = combineReducers({
  filter: filterReducer
});

export default rootReducer;
