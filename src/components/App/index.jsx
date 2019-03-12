import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Home from '../Home';
import Dashboard from '../Dashboard';
import Footer from '../Footer';

import './index.css';

export default () => (
  <Router history={createBrowserHistory()}>
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Footer />
    </div>
  </Router>
);
