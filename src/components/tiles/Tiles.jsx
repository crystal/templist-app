import PropTypes from 'prop-types';
import React, { Component } from 'react';

import styles from './Tiles.sass';

class Tiles extends Component {
  render() {
    return (
      <ul className={styles.tiles}>
        {this.props.children}
      </ul>
    );
  }
}

Tiles.defaultProps = {
  children: []
};

Tiles.propTypes = {
  children: PropTypes.array
};

export default Tiles;
