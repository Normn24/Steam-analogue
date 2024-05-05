import { combineReducers } from 'redux';
import filterReducer from './filterSlice'; 
import catalogSlice from './catalogSlice';

const rootReducer = combineReducers({
  filter: filterReducer, 
  catalog: catalogSlice
});

export default rootReducer;
