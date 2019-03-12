import React, { Component } from 'react';

import DnDBeyond from '../../dnd-beyond';
import './index.css';

const ONE_SECOND = 1000;

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

    DnDBeyond.characters(this.state.characterIDs)
      .then(characters => this.setState({ characters }));

    setInterval(this.refreshNext, 30 * ONE_SECOND);
  }
  
  componentWillUnmount() {
    clearInterval(this.refreshNext);
  }

  refreshNext() {
    const {characters} = this.state;
    
    DnDBeyond.character(this.state.characterIDs[this.state.refreshIdx])
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
      <div className="Dashboard">
        {this.state.characters.map(character => (
          <div key={character.id}>
            <img src={character.avatarUrl} alt={character.name} />
            <h2>{character.name}</h2>
            <p>
              <span className="current">
                {character.hitPoints.current}
              </span>
              /
              <span className="max">
                {character.hitPoints.max}
              </span>
              <span className="temp">
                {character.hitPoints.temp && `[${character.hitPoints.temp}]`}
              </span>
            </p>
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
