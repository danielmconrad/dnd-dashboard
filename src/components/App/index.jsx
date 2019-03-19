import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';
import Home from '../Home';
import Credits from '../Credits';
import Dashboard from '../Dashboard';
import NotFound from '../NotFound';

import './index.scss';

export default () => (
  <HashRouter>
    <div id="app">
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/credits" component={Credits} />
        <Route path="/dashboard/:characterIDs" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  </HashRouter>
);
