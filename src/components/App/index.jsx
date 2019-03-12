import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Home from '../Home';
import Dashboard from '../Dashboard';
import Footer from '../Footer';

import './index.css';

export default () => (
  <HashRouter>
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route path="/dashboard/:characterIDs" component={Dashboard} />
      <Footer />
    </div>
  </HashRouter>
);
