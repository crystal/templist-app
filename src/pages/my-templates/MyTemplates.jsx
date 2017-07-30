import firebase from 'firebase';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import selectMenuItem from '../../actions/selectMenuItem';
import showModal from '../../actions/showModal';

import Loader from '../../components/loader/Loader';
import Tile from '../../components/tile/Tile';
import Tiles from '../../components/tiles/Tiles';

import styles from './MyTemplates.sass';

class MyTemplatesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      templates: []
    };
  }
  componentWillMount() {
    this.props.selectMenuItem('myTemplates');
    firebase.database()
      .ref('/templates')
      .once('value')
      .then(function getSnapshot(snapshot) {
        const response = snapshot.val();
        const templates = [];
        Object.keys(response).forEach((key) => {
          const template = response[key];
          if (template.author === this.props.uid) {
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
              No templates saved yet. Select templates to save <a href="/browse">here</a>.
          </section>
        </div>
      );
    }
    return (
      <div className={styles.templates}>
        <section>
          <h2>My Templates</h2>
          <Tiles>
            {this.state.templates.map((template) => {
              return (
                <Tile
                  id={template.key}
                  key={`my-templates-${template.key}`}
                  isFavorite={this.props.favorites.includes(template.key)}
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

MyTemplatesPage.defaultProps = {
  favorites: [],
  isLoggedIn: false,
  selectMenuItem: () => {},
  showModal: () => {},
  uid: ''
};

MyTemplatesPage.propTypes = {
  favorites: PropTypes.array,
  isLoggedIn: PropTypes.bool,
  selectMenuItem: PropTypes.func,
  showModal: PropTypes.func,
  uid: PropTypes.string
};

function mapStateToProps(state) {
  return {
    favorites: state.user.favorites,
    isLoggedIn: state.user.isLoggedIn,
    uid: state.user.uid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectMenuItem: (selected) => {
      dispatch(selectMenuItem(selected));
    },
    showModal: (currentModal) => {
      dispatch(showModal(currentModal));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTemplatesPage);
