import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';
import Home from '../Home';
import Credits from '../Credits';
import Dashboard from '../Dashboard';

import './index.scss';

export default () => (
  <HashRouter>
    <div id="app">
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/credits" component={Credits} />
      <Route path="/dashboard/:characterIDs" component={Dashboard} />
      <Footer />
    </div>
  </HashRouter>
);
