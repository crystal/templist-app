import firebase from 'firebase';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import objectToArray from '../../lib/objectToArray';

import showModal from '../../actions/showModal';

import Tile from '../../components/tile/Tile';
import Tiles from '../../components/tiles/Tiles';

import styles from './Browse.sass';

class BrowsePage extends Component {
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
      .then(function getSnapshot(userSnapshot) {
        const user = userSnapshot.val() || {};
        const userObj = user[this.props.uid] || user || {};
        const favorites = userObj.favorites || [];
        firebase.database()
          .ref('/templates')
          .once('value')
          .then(function getTemplatesSnapshot(templatesSnapshot) {
            const response = templatesSnapshot.val();
            const templates = [];
            Object.keys(response).forEach((key) => {
              const template = response[key];
              if (!template.author) {
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

  seeSavedLists() {
    const userId = 'testuser';
    firebase.database()
      .ref(`/users/${userId}/templates`)
      .once('value')
      .then(function getSnapshot(snapshot) {
        const value = snapshot.val();
        const templates = objectToArray(value);
        templates.map((template) => {
          const titles = template.title;
          console.log(titles);
          return titles;
        });

        // this.setState({
        //   isLoading: false,
        //   description: template.description,
        //   items: template.items,
        //   title: template.title
        // });
      }.bind(this));
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
          <h2>Browse</h2>
          <Tiles>
            {this.state.templates.map((template) => {
              return (
                <Tile
                  id={template.key}
                  key={`browse-${template.key}`}
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

BrowsePage.defaultProps = {
  isLoggedIn: false,
  showModal: () => {},
  uid: ''
};

BrowsePage.propTypes = {
  isLoggedIn: PropTypes.bool,
  showModal: PropTypes.func,
  uid: PropTypes.string
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

export default connect(mapStateToProps, mapDispatchToProps)(BrowsePage);
