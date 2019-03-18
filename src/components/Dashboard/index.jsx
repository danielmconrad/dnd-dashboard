import React, { Component } from 'react';

import api from '../../api';
import Character from '../Character';
import fromBeyond from '../Character/fromBeyond';
import styles from './index.scss';

const ONE_SECOND = 1000;

class Dashboard extends Component {
  state = {
    characterConfig: null,
    characterIDs: [],
    characterIdx: 0,
    characters: [],
    params: {},
    refreshInterval: 15,
  }

  componentWillMount() {
    this.countDown = this.countDown.bind(this);
    this.getCharacters = this.getCharacters.bind(this);

    return this.setState({
      countCurrent: this.state.refreshInterval,
      characterIDs: (this.props.match.params.characterIDs || '').split(',')
    });
  }

  componentDidMount() {
    if (!this.state.characterIDs) return;

   return api.characterConfig()
      .then(characterConfig => this.setState({ characterConfig }))
      .then(() => this.getCharacters())
      .then(() => setInterval(this.countDown, ONE_SECOND));
  }

  componentWillUnmount() {
    clearInterval(this.countDown);
  }

  countDown() {
    if (this.state.countCurrent === 1) {
      return this.getCurrentCharacter().then(() => this.setState({
        characterIdx: this.getNextCharacterIdx(),
        countCurrent: this.state.refreshInterval
      }));
    }

    return this.setState({ countCurrent: this.state.countCurrent - 1 });
  }

  getNextCharacterIdx() {
    if (this.state.characterIdx === this.state.characterIDs.length - 1) {
      return 0;
    }
    return this.state.characterIdx + 1;
  }

  getCharacters() {
    return api.characters(this.state.characterIDs)
      .then(characters => characters.map(c => this.transformCharacter(c)))
      .then(characters => this.setState({ characters }));
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
