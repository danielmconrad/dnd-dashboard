import React from 'react';
import styles from './index.css';

export default (props) => (
  <div className={`${styles.character} ${props.className} padding-1`}>
    <div className="grid-x">
      <div className={`${styles.imageContainer} cell small-3`}>
        <img
          alt={props.character.name}
          className={styles.image}
          src={props.character.avatarUrl}
        />
      </div>
      <div className="cell auto padding-horizontal-1">
        <p className={styles.name}>{props.character.name}</p>
      </div>
    </div>
    <p className="margin-top-1">
      {props.character.notes.otherNotes}
    </p>
  </div>
);
