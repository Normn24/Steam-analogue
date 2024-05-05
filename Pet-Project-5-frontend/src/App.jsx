import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import FilterSearch from './components/filter/FilterSearch';
import FilterGenres from './components/filter/FilterGenres';
import FilterHeader from './components/filter/FilterHeader';
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


