import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.scss';

const DASHBOARDS = {
  'Imagination Station': [
    9912582, 7893290, 7555852, 7901953
  ],
  'Tomb of Annihilation': [
    9912582, 7893290, 7555852, 7893290, 7555852, 9912582
  ],
};

class Home extends Component {
  render() {
    return (
      <div className={`${styles.component}`}>
        {Object.keys(DASHBOARDS).map(key => (
          <p key={key}>
            <Link
              className={`button radius ${styles.dashboardLink}`}
              to={`/dashboard/${DASHBOARDS[key].join(',')}`}
            >
              {key}
            </Link>
          </p>
        ))}
      </div>
    );
  }
}

export default Home;
