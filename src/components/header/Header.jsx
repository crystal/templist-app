import React from 'react';

import { Link } from 'react-router';

import styles from './Header.sass';

class Header extends React.Component {
  render() {
    return (
      <div className={styles.header}>
        <section>
          <h1>Templist</h1>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="about">About</Link>
            </li>
            <li>
              <Link to="templates">Templates</Link>
            </li>
          </ul>
        </section>
      </div>
    );
  }
}

export default Header;
