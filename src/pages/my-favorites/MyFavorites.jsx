import firebase from 'firebase';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import showModal from '../../actions/showModal';

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
      .ref(`/users/${this.props.uid}`)
      .once('value')
      .then(function getFavoritesSnapshot(userSnapshot) {
        const user = userSnapshot.val() || {};
        const userObj = user[this.props.uid] || user || {};
        const favorites = userObj.favorites || [];
        firebase.database()
          .ref('/templates')
          .once('value')
          .then(function getTemplatesSnapshot(templatesSnapshot) {
            const templatesResponse = templatesSnapshot.val();
            const templates = [];
            Object.keys(templatesResponse).forEach((key) => {
              const template = templatesResponse[key];
              if (favorites.includes(key)) {
                template.key = key;
                template.isFavorite = favorites.includes(key);
                templates.push(Object.assign(template, { key }));
              }
            });
            this.setState({
              isLoading: false,
              templates
            });
          }.bind(this));
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
            Loading...
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
              return (
                <Tile
                  id={template.key}
                  key={`my-favorites-${template.key}`}
                  isFavorite={template.isFavorite}
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
  isLoggedIn: false,
  showModal: () => {},
  uid: ''
};

MyFavoritesPage.propTypes = {
  isLoggedIn: React.PropTypes.bool,
  showModal: React.PropTypes.func,
  uid: React.PropTypes.string
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.user.isLoggedIn,
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
