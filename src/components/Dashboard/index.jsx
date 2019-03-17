import React, { Component } from 'react';

import api from '../../api';
import Character from '../Character';
import fromBeyond from '../Character/fromBeyond';
import styles from './index.scss';

const ONE_SECOND = 1000;
const IS_DEV = process.env.NODE_ENV === 'development';

class Dashboard extends Component {
  state = {
    characterConfig: null,
    characterIDs: [],
    characters: [],
    params: {},
  }

  componentWillMount() {
    this.getCharacters = this.getCharacters.bind(this);

    this.setState({
      characterIDs: (this.props.match.params.characterIDs || '').split(',')
    });
  }

  componentDidMount() {
    if (!this.state.characterIDs) return;

    api.characterConfig()
      .then(characterConfig => this.setState({ characterConfig }))
      .then(() => this.getCharacters());

    !IS_DEV && setInterval(this.getCharacters, 60 * ONE_SECOND);
  }

  componentWillUnmount() {
    !IS_DEV && clearInterval(this.refreshNext);
  }

  getCharacters() {
    api.characters(this.state.characterIDs)
      .then(characters => characters.map(c => this.transformCharacter(c)))
      .then(characters => this.setState({ characters }));
  }

  transformCharacter(character) {
    return fromBeyond(this.state.characterConfig, character);
  }

  render() {
    return (
      <div className={`${styles.component} grid-container full`}>
        <div className="grid-x grid-margin-y grid-margin-x">
          {this.state.characters.map(character => (
            <div key={character.id} className="cell small-12 medium-6 xlarge-4">
              <Character character={character} className="" />
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
