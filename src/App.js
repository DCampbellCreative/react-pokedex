import React from 'react';
import 'normalize.css';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import { MainView } from './components/MainView/MainView'

function App() {
  return (
    <div className="App">
      {/* <h1>Pokédex</h1> */}
      <MainView />
    </div>
  );
}

export default App;
