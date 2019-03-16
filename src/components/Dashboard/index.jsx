import React, { Component } from 'react';

import api from '../../api';
import Character from '../Character';
import fromBeyond from '../Character/fromBeyond';
import styles from './index.css';

const ONE_SECOND = 1000;

const isDev = process.env.NODE_ENV === 'development';

class Dashboard extends Component {
  state = {
    config: null,
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

    api.config()
      .then(config => this.setState({ config }))
      .then(() => this.getCharacters());
  }

  getCharacters() {
    api.characters(this.state.characterIDs)
      .then(characters => characters.map(c => fromBeyond(this.state.config, c)))
      .then(characters => this.setState({ characters }));

    !isDev && setInterval(this.refreshNext, 30 * ONE_SECOND);
  }

  componentWillUnmount() {
    !isDev && clearInterval(this.refreshNext);
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
