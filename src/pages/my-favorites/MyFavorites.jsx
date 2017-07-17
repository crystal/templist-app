import firebase from 'firebase';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import showModal from '../../actions/showModal';

import Loader from '../../components/loader/Loader';
import Tile from '../../components/tile/Tile';
import Tiles from '../../components/tiles/Tiles';

import styles from './MyFavorites.sass';

class MyFavoritesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      templates: []
    };
  }
  componentWillMount() {
    firebase.database()
      .ref('/templates')
      .once('value')
      .then(function getTemplatesSnapshot(templatesSnapshot) {
        const templatesResponse = templatesSnapshot.val();
        const templates = [];
        Object.keys(templatesResponse).forEach((key) => {
          const template = templatesResponse[key];
          if (this.props.favorites.includes(key)) {
            template.key = key;
            templates.push(Object.assign(template, { key }));
          }
        });
        this.setState({
          isLoading: false,
          templates
        });
      }.bind(this));
  }
  saveList(template) {
    if (!this.props.isLoggedIn) {
      this.props.showModal('login');
      return
    }
    const userId = 'testuser';
    firebase.database()
      .ref(`/users/${userId}/templates`)
      .push({
        user: 'test123',
        title: template.title
      })
      .then(() => {
        console.log('done!');
      });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <div className={styles.templates}>
          <section>
            <Loader />
          </section>
        </div>
      );
    }
    if (this.state.templates.length === 0) {
      return (
        <div className={styles.templates}>
          <section className={styles.alert}>
            No favorites added yet. Select templates to add <a href="/browse">here</a>.
          </section>
        </div>
      );
    }
    return (
      <div className={styles.templates}>
        <section>
          <h2>My Favorites</h2>
          <Tiles>
            {this.state.templates.map((template) => {
              if (!this.props.favorites.includes(template.key)) {
                return null;
              }
              return (
                <Tile
                  id={template.key}
                  key={`my-favorites-${template.key}`}
                  isFavorite
                  title={template.title}
                  description={template.description}
                  url={`templates/${template.key}`}
                  items={template.items}
                />
              );
            })}
          </Tiles>
        </section>
      </div>
    );
  }
}

MyFavoritesPage.defaultProps = {
  favorites: [],
  isLoggedIn: false,
  showModal: () => {},
  uid: ''
};

MyFavoritesPage.propTypes = {
  favorites: PropTypes.array,
  isLoggedIn: PropTypes.bool,
  showModal: PropTypes.func,
  uid: PropTypes.string
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.user.isLoggedIn,
    favorites: state.user.favorites,
    uid: state.user.uid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showModal: (currentModal) => {
      dispatch(showModal(currentModal));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFavoritesPage);
