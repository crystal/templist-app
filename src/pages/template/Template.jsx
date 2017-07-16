import firebase from 'firebase';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Button from '../../components/button/Button';
import IconButton from '../../components/icon-button/IconButton';

import styles from './Template.sass';

class TemplatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      editMode: false,
      isLoading: true,
      isComplete: false,
      isSubmitting: false,

      description: '',
      newTitle: '',
      items: [],
      title: ''
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
  handleAuth() {
    const authenticationSuccess = () => {
      this.setState({
        auth: true
      });
      this.handleExportSubmit();
    };
    const authenticationFailure = () => {
      console.log('Failed authentication');
    };

    Trello.authorize({
      type: 'popup',
      name: 'Getting Started Application',
      scope: {
        read: 'true',
        write: 'true' },
      expiration: 'never',
      success: authenticationSuccess.bind(this),
      error: authenticationFailure
    });
  }
  handleExport() {
    if (!this.state.auth) {
      this.handleAuth();
      return;
    }
    this.handleExportSubmit();
  }
  handleExportSubmit() {
    this.setState({
      isSubmitting: true
    });

    const newBoard = {
      name: this.state.newTitle || this.state.title
    };
    Trello.post('/boards/', newBoard, function (board) {
      Trello.get(`/boards/${board.id}/lists`, function (lists) {
        const myList = lists[0].id;
        this.state.items.forEach(function (itemText) {
          const newCard = {
            name: itemText,
            // Place this card at the bottom of my list
            idList: myList,
            pos: 'bottom'
          };
          Trello.post('/cards/', newCard, function () {
            this.setState({
              isComplete: true,
              isSubmitting: false
            });
          }.bind(this));
        }.bind(this));
      }.bind(this));
    }.bind(this));
  }
  handleInput({ target: { name, value } }) {
    const items = this.state.items;
    items[name] = value;

    this.setState({
      items
    });
  }
  toggleEditMode(enabled) {
    // set opposite of current edit mode by default
    let editMode = !this.state.editMode;
    // override edit mode setting
    if (enabled !== undefined) {
      editMode = enabled;
    }
    this.setState({
      editMode
    });
  }
  handleDelete(index) {
    // use splice to alter the array of items and return it
    //  w/o the deleted item items.splice(X, 1)
    const items = this.state.items;
    items.splice(index, 1);
    this.setState({ items });
  }

  handleSave() {
    console.log(this.state.items);

  }

  handleTitleInput({ target: { value } }) {
    this.setState({
      title: value
    });
  }
  render() {
    if (this.state.isComplete) {
      return (
        <div>
          <section>
            <h2>You are done!</h2>
            <p>Good job on your new list: <b>{this.state.newTitle || this.state.title}</b></p>
          </section>
        </div>
      );
    }
    if (this.state.isLoading) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <div className={styles.template}>
        <section>
          <div className={styles.buttons}>
            {this.state.editMode && (
              <div>
                <Button className={styles.editButton} onClick={() => this.toggleEditMode(false)}>
                  cancel
                </Button>
                {/* if logged in and in edit mode, then show save button */}
                <Button
                  className={styles.saveButton}
                  onClick={() => this.handleSave()}
                >
                  save
                </Button>
                <Button className={styles.editButton} onClick={() => this.handleExport()}>
                  {this.state.isSubmitting ? 'loading...' : 'export'}
                </Button>
              </div>
            )}
            {!this.state.editMode && (
              <div>
                <IconButton
                  className={styles.editButton}
                  onClick={() => this.toggleEditMode(true)}
                  size={32}
                  type="writing"
                />
                <IconButton
                  className={styles.editButton}
                  onClick={() => this.handleCopy()}
                  size={32}
                  type="layer"
                />
                <IconButton
                  className={styles.editButton}
                  onClick={() => this.handleExport()}
                  size={32}
                  type="send"
                />
              </div>
            )}
          </div>
          <h2>
            {this.state.editMode && (
              <input
                onChange={e => this.handleTitleInput(e)}
                value={this.state.newTitle || this.state.title}
              />
            )}
            {!this.state.editMode && (
              <span>{this.state.title}</span>
            )}
          </h2>
          <p>{this.state.description}</p>
          <ul className={styles.items}>
            {this.state.items.map((item, index) => {
              return (
                <li>
                  {this.state.editMode && (
                    <div>
                      <input name={index} onChange={e => this.handleInput(e)} type="text" value={item} />
                      <button className={styles.deleteButton} onClick={() => this.handleDelete(index)}>delete</button>
                    </div>
                  )}
                  {!this.state.editMode && (
                    <span>{item}</span>
                  )}
                </li>
              );
            })}
          </ul>
          <div className={styles.margin} />
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
