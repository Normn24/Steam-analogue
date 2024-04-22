import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import FilterSearch from './filter/FilterSearch';
import FilterGenres from './filter/FilterGenres';
import FilterHeader from './filter/FilterHeader';
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <FilterHeader />
        <FilterSearch />
        <FilterGenres />
      </div>
    </Provider>
  );
}

export default App;


