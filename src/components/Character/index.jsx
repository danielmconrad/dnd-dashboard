import React from 'react';
import styles from './index.scss';

export default props => (
  <div className={`${styles.character} ${props.className} grid-y`}>
    <div className="cell grid-x">
      <div className={`${styles.imageContainer} cell small-3 xlarge-4`}>
        <Image character={props.character} />
      </div>
      <div className={`${styles.nameAndStats} cell auto grid-y`}>
        <Name className="cell small-4" character={props.character} />
        <Stats className="cell small-4" character={props.character} />
        <Conditions className="cell small-4" character={props.character} />
        <Notes className={`cell small-4 ${styles.topNotes}`} character={props.character} />
      </div>
    </div>
    <Notes className={`${styles.bottomNotes} cell auto`} character={props.character} />
  </div>
);

const Image = props => (
  <svg
    className={`${styles.image} ${props.className}`}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <image
      xlinkHref={props.character.avatarUrl}
      width="100%" x="0" y="0"
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
    {props.character.inspiration && (
      <span className={`${styles.stat} ${styles.inspiration}`}>
        <i className="fas fa-sun" />
      </span>
    )}
    <span className={`${styles.stat} ${styles.speed}`}>
      <i className="fas fa-walking" />
      <span className={styles.statVal}>
        {props.character.speed}
      </span>
    </span>
    <span className={`${styles.stat} ${styles.armorClass}`}>
      <i className="fas fa-shield-alt" />
      <span className={styles.statVal}>
        {props.character.armorClass}
      </span>
    </span>
    <span className={`${styles.stat} ${styles[props.character.hitPoints.status]}`}>
      <i className="fas fa-heartbeat" />
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
        <div className={styles.scroller}>
          <i className="fas fa-exclamation-triangle" />
          <span className={styles.statVal}>
            {props.character.conditions.join(', ')}
          </span>
        </div>
      </div>
    : null
);

const Notes = props => (
  <div className={`${props.className}`}>
    <div className={styles.scroller}>
      {props.character.notes.otherNotes || 'No notes.'}
    </div>
  </div>
);
