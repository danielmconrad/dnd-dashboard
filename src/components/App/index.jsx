import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../Home';
import Dashboard from '../Dashboard';
import Footer from '../Footer';

import './index.css';

export default () => (
  <Router>
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Footer />
    </div>
  </Router>
);
