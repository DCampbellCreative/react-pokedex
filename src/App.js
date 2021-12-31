import React from 'react';
import 'normalize.css';
import './App.css';

import { MainView } from './components/MainView/MainView'

function App() {
  return (
    <div className="App">
      <h1 className='header'>Pokédex</h1>
      <MainView />
    </div>
  );
}

export default App;
