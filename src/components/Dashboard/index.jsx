import React, { Component } from 'react';

import DnDBeyond from '../../dnd-beyond';

import './index.css';

class Dashboard extends Component {
  state = {
    characters: DnDBeyond.fixtures,
    // characterIDs: ['8958758'],
    // characters: [],
  }

  componentDidMount() {
    // Promise
    //   .all(this.state.characterIDs.map(id => DnDBeyond.character(id)))
    //   .then(characters => this.setState({ characters }));
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
      </div>
    );
  }
}

export default Dashboard;
