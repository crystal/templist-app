import firebase from 'firebase';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import styles from './Template.sass';

class TemplatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      templates: []
    };
  }
  componentWillMount() {
    firebase.database()
      .ref(`/templates/${this.props.router.params.listType}`)
      .once('value')
      .then(function getSnapshot(snapshot) {
        const template = snapshot.val();
        this.setState({
          isLoading: false,
          description: template.description,
          items: template.items,
          title: template.title
        });
      }.bind(this));
  }
  render() {
    if (this.state.isLoading) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <div className={styles.templates}>
        <section>
          <h1>{this.state.title}</h1>
          <ul className={styles.items}>
            {this.state.items.map((item) => {
              return (
                <li>{item}</li>
              );
            })}
          </ul>
        </section>
      </div>
    );
  }
}


TemplatePage.defaultProps = {
  router: {}
};

TemplatePage.propTypes = {
  router: PropTypes.object
};

export default TemplatePage;
