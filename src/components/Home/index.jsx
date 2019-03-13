import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Link to="/dashboard/9912582,7893290,7555852">Imagination Station</Link>
      </div>
    );
  }
}

export default Home;
