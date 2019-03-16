import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.css';

export default props => (
  <div className={`${styles.component} ${props.className}`}>
    <Link className="padding-half" to="/">Home</Link>
    <Link className="padding-half" to="/credits">Credits</Link>
  </div>
);
