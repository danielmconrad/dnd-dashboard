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
        <p className={styles.stats}>
          <span className={`${styles.stat} ${styles.speed}`}>
            <i className="fas fa-walking"></i>
            <span className={styles.statVal}>35</span>
          </span>
          <span className={`${styles.stat} ${styles.ac}`}>
            <i className="fas fa-shield-alt"></i>
            <span className={styles.statVal}>18</span>
          </span>
          <span className={`${styles.stat} ${styles.health} ${props.character.hitPoints.status}`}>
            <i className="fas fa-heartbeat"></i>
            {props.character.hitPoints.temp
              ? (
                <span className={styles.statVal}>
                  [{props.character.hitPoints.temp}]
                </span>
              )
              : (
                <span className={styles.statVal}>
                  {props.character.hitPoints.current} / {props.character.hitPoints.max}
                </span>
              )
            }
          </span>
        </p>
        {props.character.conditions.length ? (
          <p className={styles.conditions}>
            <i className="fas fa-exclamation-triangle"></i>
            <span className={styles.statVal}>
              {props.character.conditions.join(', ')}
            </span>
          </p>
        ) : null}
      </div>
    </div>
    <p className="margin-top-1">
      {props.character.notes.otherNotes}
    </p>
  </div>
);
