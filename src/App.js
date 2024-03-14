import './App.css';
import React from 'react';
import CampusWifiForm from './CampusWifiForm.js';
import LocationScores from './LocationScores.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LocationScores />
        <CampusWifiForm />
      </header>
    </div>
  );
}

export default App;
