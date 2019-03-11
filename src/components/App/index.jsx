import React, { Component } from 'react';

import Dashboard from '../Dashboard';
import Footer from '../Footer';

import './index.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dashboard />
        <Footer />
      </div>
    );
  }
}

export default App;
