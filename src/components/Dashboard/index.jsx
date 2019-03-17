import React, { Component } from 'react';

import api from '../../api';
import Character from '../Character';
import fromBeyond from '../Character/fromBeyond';
import styles from './index.css';

// const ONE_SECOND = 1000;

class Dashboard extends Component {
  state = {
    characterConfig: null,
    characters: [],
    refreshIdx: 0,
    params: {},
  }

  componentWillMount() {
    this.refreshNext = this.refreshNext.bind(this);

    this.setState({
      characterIDs: (this.props.match.params.characterIDs || '').split(',')
    });
  }

  componentDidMount() {
    if (!this.state.characterIDs) return;

    api.characterConfig()
      .then(characterConfig => this.setState({ characterConfig }))
      .then(() => this.getCharacters());
  }

  componentWillUnmount() {
    // !config.isDev && clearInterval(this.refreshNext);
  }

  getCharacters() {
    api.characters(this.state.characterIDs)
      .then(characters => characters.map(c => this.transformCharacter(c)))
      .then(characters => this.setState({ characters }));

    // !config.isDev && setInterval(this.refreshNext, 30 * ONE_SECOND);
  }

  transformCharacter(character) {
    return fromBeyond(this.state.characterConfig, character);
  }

  refreshNext() {
    const {characters} = this.state;

    api.character(this.state.characterIDs[this.state.refreshIdx])
      .then(character => characters[this.state.refreshIdx] = fromBeyond(character))
      .then(() => this.setState({ characters }))
      .then(() => this.incrementIndex());
  }

  incrementIndex() {
    let newIndex = this.state.refreshIdx + 1;

    this.setState({
      refreshIdx: newIndex >= this.state.characters.length ? 0 : newIndex
    });
  }

  render() {
    return (
      <div className={`${styles.component} grid-x`}>
        {this.state.characters.map(character => (
          <div key={character.id} className="cell small-12 medium-6">
            <Character character={character} className="margin-bottom-half margin-horizontal-half" />
          </div>
        ))}

        {!this.state.characterIDs && (
          <div>No characters selected!</div>
        )}
      </div>
    );
  }
}

export default Dashboard;
