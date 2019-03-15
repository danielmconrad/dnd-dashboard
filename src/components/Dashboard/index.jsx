import React, { Component } from 'react';

import api from '../../api';
import Character from '../Character';
import './index.css';

const ONE_SECOND = 1000;

const isDev = process.env.NODE_ENV === 'development';

class Dashboard extends Component {
  state = {
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

    api.characters(this.state.characterIDs)
      .then(characters => this.setState({ characters }));

    !isDev && setInterval(this.refreshNext, 30 * ONE_SECOND);
  }

  componentWillUnmount() {
    !isDev && clearInterval(this.refreshNext);
  }

  refreshNext() {
    const {characters} = this.state;

    api.character(this.state.characterIDs[this.state.refreshIdx])
      .then(character => characters[this.state.refreshIdx] = character)
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
      <div className="Dashboard padding-horizontal-2">
        <div className="grid-x margin-bottom-1 grid-margin-x">
          {this.state.characters.map(character => (
            <Character
              key={character.id}
              character={character}
              className="cell small-4"
            />
          ))}
        </div>

        {!this.state.characterIDs && (
          <div>No characters selected!</div>
        )}
      </div>
    );
  }
}

export default Dashboard;
