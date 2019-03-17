import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.scss';

export default props => (
  <div className={`${styles.component} ${props.className}`}>
    <div className="grid-x">
      <div className="cell small-6">
        <Link to="/">Home</Link>
      </div>
      <div className="cell small-6 text-right">
        <Link to="/credits">Credits</Link>
      </div>
    </div>
  </div>
);
