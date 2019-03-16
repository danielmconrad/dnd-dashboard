import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.css';

class Home extends Component {
  render() {
    return (
      <div className={styles.component}>
        <Link
          className={`button radius ${styles.imaginationLink}`}
          to="/dashboard/9912582,7893290,7555852,7893290,7555852,9912582"
        >
          Imagination Station
        </Link>
      </div>
    );
  }
}

export default Home;
