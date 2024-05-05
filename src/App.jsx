import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import FilterSearch from './components/filter/FilterSearch';
import FilterGenres from './components/filter/FilterGenres';
import FilterHeader from './components/filter/FilterHeader';
import Catalog from './components/catalog/Catalog';
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <FilterHeader />
        <FilterSearch />
        <FilterGenres /> */}
        <Catalog/>
      </div>
    </Provider>
  );
}

export default App;


