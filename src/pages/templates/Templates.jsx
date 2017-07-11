import firebase from 'firebase';
import React, { Component } from 'react';
import { Link } from 'react-router';

import styles from './Templates.sass';

class TemplatesPage extends Component {
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
      .then(function getSnapshot(snapshot) {
        const response = snapshot.val();
        const templates = [];
        Object.keys(response).forEach((key) => {
          const template = response[key];
          templates.push(Object.assign(template, { key }));
        });
        this.setState({
          isLoading: false,
          templates
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
          <h1>Templates</h1>
          <ul className={styles.tiles}>
            {this.state.templates.map((template) => {
              return (
                <li key={template.key}>
                  <Link className={styles.tile} to={`templates/${template.key}`}>
                    <h3>{template.title}</h3>
                    <p>{template.description}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    );
  }
}

export default TemplatesPage;
