import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Link to="/dashboard?character_ids=8958758">Niamh</Link>
      </div>
    );
  }
}

export default Home;
