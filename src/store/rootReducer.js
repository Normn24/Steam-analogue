import { combineReducers } from 'redux';
import filterReducer from './filterSlice'; 
import catalogSlice from './catalogSlice';
import genresSlice from './genresSlice';

const rootReducer = combineReducers({
  filter: filterReducer, 
  catalog: catalogSlice, 
  genres: genresSlice
});

export default rootReducer;
