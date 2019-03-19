import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.scss';

const DASHBOARDS = {
  'Imagination Station': [
    9912582, 7893290, 7555852, 7901953, 10121413
  ],
  // 'Tomb of Annihilation': [
  //   8958758
  // ],
};

class Home extends Component {
  render() {
    return (
      <div className={`${styles.component}`}>
        {Object.keys(DASHBOARDS).map(key => (
          <Link
            key={key}
            className={styles.dashboardLink}
            to={`/dashboard/${DASHBOARDS[key].join(',')}`}
          >
            {key}
          </Link>
        ))}
      </div>
    );
  }
}

export default Home;
