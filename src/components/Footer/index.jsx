import React from 'react';
// import { Link } from 'react-router-dom';
import styles from './index.css';

export default (props) => (
  <div className={`${styles.component} ${props.className}`}>
  </div>
);
