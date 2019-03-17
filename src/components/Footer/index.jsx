import React from 'react';
import styles from './index.scss';

export default props => (
  <div className={`${styles.component} ${props.className}`}>
  </div>
);
