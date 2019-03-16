import React from 'react';
import styles from './index.css';

export default props => (
  <div className={`${styles.component} ${props.className}`}>
  </div>
);
