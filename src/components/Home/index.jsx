import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Link to="/dashboard/8958758">Niamh</Link>
      </div>
    );
  }
}

export default Home;
