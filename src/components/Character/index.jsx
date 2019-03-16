import React from 'react';
import styles from './index.css';

export default props => (
  <div className={`${styles.character} ${props.className}`}>
    <div className="grid-x">
      <div className="shrink cell small-3 medium-4">
        <Image character={props.character} />
      </div>
      <div className={`${styles.nameAndStats} grid-y cell auto`}>
        <Name className="cell small-4" character={props.character} />
        <Stats className="cell small-4" character={props.character} />
        <Conditions className="cell small-4" character={props.character} />
        <Notes className={`cell small-4 ${styles.topNotes}`} character={props.character} />
      </div>
    </div>
    <Notes className={styles.bottomNotes} character={props.character} />
  </div>
);

const Image = props => (
  <svg
    className={`${styles.imageContainer} ${props.className}`}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <image
      xlinkHref={props.character.avatarUrl}
      width="100%"
      x="0"
      y="0"
    />
  </svg>
);

const Name = props => (
  <div className={`${styles.name} ${props.className}`}>
    {props.character.name}
  </div>
);

const Stats = props => (
  <div className={`${styles.stats} ${props.className}`}>
    <span className={`${styles.stat} ${styles.speed}`}>
      <i className="fas fa-walking"></i>
      <span className={styles.statVal}>35</span>
    </span>
    <span className={`${styles.stat} ${styles.ac}`}>
      <i className="fas fa-shield-alt"></i>
      <span className={styles.statVal}>18</span>
    </span>
    <span className={`${styles.stat} ${styles.health} ${styles[props.character.hitPoints.status]}`}>
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
  </div>
);

const Conditions = props => (
  props.character.conditions.length
    ? <div className={`${styles.conditions} ${props.className}`}>
        <i className="fas fa-exclamation-triangle"></i>
        <span className={styles.statVal}>
          {props.character.conditions.join(', ')}
        </span>
      </div>
    : null
);

const Notes = props => (
  <div className={`${props.className}`}>
    {props.character.notes.otherNotes || 'No notes.'}
  </div>
);
