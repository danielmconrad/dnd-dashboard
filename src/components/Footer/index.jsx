import React, { Component } from 'react';

import './index.css';

class Footer extends Component {
  state = {
    showCredits: false,
  }

  toggleCredits(e) {
    e.preventDefault();
    this.setState({ showCredits: !this.state.showCredits });
  }

  render() {
    return (
      <div className="Dashboard">
        <a href="/" onClick={(e) => this.toggleCredits(e)}>Credits</a>

        {this.state.showCredits && (
          <div>
            <div>Favicon made by <a href="https://www.flaticon.com/authors/freepik">freepik</a> from www.flaticon.com </div>
            <div>Data supplied by <a href="https://www.dndbeyond.com">D&amp;D Beyond</a></div>
          </div>
        )}
      </div>
    );
  }
}

export default Footer;
