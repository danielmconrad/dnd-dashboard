import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.scss';

export default props => (
  <div className={`${styles.component} ${props.className}`}>
    <Link className={styles.a} to="/">Home</Link>
    <Link className={styles.a} to="/credits">Credits</Link>
  </div>
);
