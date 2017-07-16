import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router';

import IconButton from '../icon-button/IconButton';

import styles from './Tile.sass';

class Tile extends Component {
  toggleFavorite(e) {
    e.preventDefault();
    alert('test');
  }
  render() {
    if (this.props.isLoading) {
      return (
        <li className={styles.loading}>
          Loading...
        </li>
      );
    }
    return (
      <li className={styles.tile}>
        <Link to={this.props.url}>
          <div className={styles.page}>
            <div className={styles.spacer} />
            {!this.props.isFavorite && (
              <div className={styles.button} />
            )}
            {this.props.isFavorite && (
              <IconButton className={styles.button} onClick={e => this.toggleFavorite(e)} type="heart" />
            )}
            <h3>{this.props.title}</h3>
            <p>{this.props.description}</p>
            <ul className={styles.items}>
              {this.props.items.map((item) => {
                return (
                  <li>{item}</li>
                );
              })}
            </ul>
            <div className={styles.margin} />
          </div>
        </Link>
      </li>
    );
  }
}

Tile.defaultProps = {
  description: '',
  isFavorite: false,
  isLoading: false,
  items: [],
  title: '',
  url: ''
};

Tile.propTypes = {
  description: PropTypes.string,
  isLoading: PropTypes.bool,
  isFavorite: PropTypes.bool,
  items: [],
  title: PropTypes.string,
  url: PropTypes.string
};

export default Tile;
