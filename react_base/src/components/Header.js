import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {

  render() {
    return (
      <div>
        <ul>
          <li><Link to={'/'}>홈</Link></li>
          <li><Link to={'/about'}>About</Link></li>
        </ul>
      </div>
    );
  }
}
