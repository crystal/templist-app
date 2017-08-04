import firebase from 'firebase';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import IconButton from '../icon-button/IconButton';

import listFavorites from '../../actions/listFavorites';

import styles from './Tile.sass';

class Tile extends Component {
  toggleFavorite(e) {
    e.preventDefault();
    firebase.database()
      .ref(`/users/${this.props.uid}/favorites`)
      .once('value')
      .then(function getSnapshot(snapshot) {
        const favorites = snapshot.val() || [];
        if (!this.props.isFavorite && !favorites.includes(this.props.id)) {
          favorites.push(this.props.id);
        } else if (this.props.isFavorite && favorites.includes(this.props.id)) {
          favorites.splice(favorites.indexOf(this.props.id), 1);
        }
        firebase.database()
          .ref(`/users/${this.props.uid}/favorites`)
          .set(favorites)
          .then(function setFavorites() {
            this.props.listFavorites(this.props.uid);
          }.bind(this));
      }.bind(this));
  }
  render() {
    if (this.props.isLoading) {
      return (
        <li className={styles.loading}>
          Loading...
        </li>
      );
    }
    const dummyItems = [];
    for (let i = this.props.items.length; i < this.props.maxItems + 1; i += 1) {
      dummyItems.push('');
    }
    return (
      <li className={styles.tile}>
        <Link to={this.props.url}>
          <div className={styles.page}>
            <div className={styles.spacer} />
            {this.props.isFavorite && (
              <IconButton className={styles.button} onClick={e => this.toggleFavorite(e)} type="heart" />
            )}
            {!this.props.isFavorite && (
              <IconButton className={styles.button} onClick={e => this.toggleFavorite(e)} type="heart-gray" />
            )}
            <h3 title={this.props.title}>
              {this.props.title}
            </h3>
            <p title={this.props.description}>
              {this.props.description}
            </p>
            <ul className={styles.items}>
              {this.props.items.slice(0, 7).concat(dummyItems).map((item) => {
                return (
                  <li title={item}>{item || (<span>&nbsp;</span>)}</li>
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
  listFavorites: () => {},
  maxItems: 6,
  id: '',
  title: '',
  uid: '',
  url: ''
};

Tile.propTypes = {
  description: PropTypes.string,
  isLoading: PropTypes.bool,
  isFavorite: PropTypes.bool,
  items: [],
  id: PropTypes.string,
  listFavorites: PropTypes.func,
  maxItems: PropTypes.number,
  title: PropTypes.string,
  uid: PropTypes.string,
  url: PropTypes.string
};


function mapStateToProps(state) {
  return {
    uid: state.user.uid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    listFavorites: (uid) => {
      dispatch(listFavorites(uid));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
