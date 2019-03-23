import React, { Component } from 'react';

import api from '../../api';
import Character from '../Character';
import fromBeyond from '../Character/fromBeyond';
import styles from './index.scss';

const ONE_SECOND = 1000;
const REFRESH_INTERVAL = 15;

class Dashboard extends Component {
  state = {
    characterConfig: null,
    characterIDs: [],
    characterIdx: 0,
    characters: [],
    countCurrent: null,
    didError: false,
    err: null,
    isLoadingCharacters: false,
    isLoadingConfig: false,
    isMissingIDs: false,
    params: {},
    refreshInterval: 15,
  }

  componentWillMount() {
    const characterIDs = (this.props.match.params.characterIDs || '').split(',');

    return this.setState({
      characterIDs: characterIDs,
      isMissingIDs: !characterIDs.length,
    });
  }

  componentDidMount() {
    this.loadCharacters().then(() => this.restartCountdown());
  }

  componentWillUnmount() {
    this.stopCoundown();
  }

  restartCountdown() {
    this.setState({ countCurrent: REFRESH_INTERVAL });
    this.countDown = setInterval(() => this.tick(), ONE_SECOND);
  }

  stopCoundown() {
    clearInterval(this.countDown);
  }

  tick() {
    if (this.state.countCurrent === 1) {
      this.stopCoundown();

      return this.getCurrentCharacter()
        .then(() => this.setState({characterIdx: this.getNextCharacterIdx() }))
        .then(() => this.restartCountdown());
    }

    return this.setState({ countCurrent: this.state.countCurrent - 1 });
  }

  getNextCharacterIdx() {
    if (this.state.characterIdx === this.state.characterIDs.length - 1) {
      return 0;
    }
    return this.state.characterIdx + 1;
  }

  loadCharacters() {
    return this.state.characterIDs &&
      Promise.resolve(this.setState({ isLoadingConfig: true }))
      .then(() => api.characterConfig())
      .then(characterConfig => this.setState({ characterConfig, isLoadingConfig: false, isLoadingCharacters: true }))
      .then(() => api.characters(this.state.characterIDs))
      .then(characters => characters.map(c => this.transformCharacter(c)))
      .then(characters => this.setState({ characters, isLoadingCharacters: false }))
      .catch(err => this.setState({ err: err, didError: true, isLoadingCharacters: false }))
  }

  getCurrentCharacter() {
    return api.character(this.state.characterIDs[this.state.characterIdx])
      .then(character => this.setCharacter(character));
  }

  setCharacter(character) {
    return this.setState({
      characters: this.state.characters.map(char => char.id === character.id
        ? this.transformCharacter(character)
        : char
      )
    });
  }

  transformCharacter(character) {
    return fromBeyond(this.state.characterConfig, character);
  }

  countdownPercentage(characterIdx) {
    if (characterIdx !== this.state.characterIdx) return 0;
    return 100 - ((this.state.countCurrent - 1) / this.state.refreshInterval) * 100;
  }

  render() {
    if (this.state.isMissingIDs) return (
      <p className={styles.info}>Missing Character IDs.</p>
    );

    if (this.state.isLoadingConfig) return (
      <p className={styles.info}>Loading Configuration...</p>
    );

    if (this.state.isLoadingCharacters) return (
      <p className={styles.info}>Loading Characters...</p>
    );

    if (this.state.didError) return (
      <p className={styles.info}>Something went wrong. {this.state.err.message}</p>
    );

    return (
      <div className={`${styles.component} grid-container full`}>
        <div className="grid-x grid-margin-y grid-margin-x">
          {this.state.characters.map((character, i) => (
            <div key={character.id} className="cell small-12 medium-6 xlarge-4">
              <Character character={character} className="" />
              <div className={styles.progress}>
                <div
                  className={styles.progressMeter}
                  style={{width: `${this.countdownPercentage(i)}%` }}
                />
              </div>
            </div>
          ))}

          {!this.state.characterIDs && (
            <div>No characters selected!</div>
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
