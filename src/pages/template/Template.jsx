import firebase from 'firebase';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import getTemplate from '../../actions/getTemplate';
import listFavorites from '../../actions/listFavorites';
import resetTemplate from '../../actions/resetTemplate';
import selectMenuItem from '../../actions/selectMenuItem';
import showModal from '../../actions/showModal';

import Button from '../../components/button/Button';
import Loader from '../../components/loader/Loader';
import Tile from '../../components/tile/Tile';
import IconButton from '../../components/icon-button/IconButton';

import styles from './Template.sass';

class TemplatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      editMode: false,
      graphic: '',
      isLoading: true,
      isNew: false,
      isSubmitting: false,

      author: '',
      description: '',
      key: '',
      newTitle: '',
      newValue: '',
      items: [],
      title: ''
    };
  }
  componentWillMount() {
    if (location.pathname === '/my/templates/new') {
      this.props.selectMenuItem('newTemplate');
      this.toggleEditMode(true);
      this.setState({
        graphic: 'lists',
        isNew: true
      });
      return;
    }
    this.setState({
      graphic: location.pathname.split('/')[2],
      isNew: true
    });
    this.props.selectMenuItem('');
    this.loadTemplate();
  }
  componentWillUpdate(nextProps) {
    if (nextProps.isDeleted) {
      this.props.push('/my/templates');
    } else if (nextProps.isSaved) {
      this.props.push(`/templates/${nextProps.newKey}`);
      this.props.resetTemplate();
      this.loadTemplate();
    }
  }
  componentWillUnmount() {
    this.props.resetTemplate();
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
      name: 'TempLists',
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
    this.props.showModal('export', {
      author: this.props.uid,
      description: this.props.templateDescription,
      items: this.props.templateItems,
      title: this.props.templateTitle
    });
  }
  handleInput({ target: { name, value } }) {
    this.setState({
      [name]: value
    });
  }
  handleItemInput({ target: { name, value } }) {
    const items = this.state.items;
    items[name] = value;

    this.setState({
      items
    });
  }
  handleNewInput({ target: { value } }) {
    this.setState({
      newValue: value
    });
  }
  handleNewSubmit() {
    const items = this.state.items;
    items.push(this.state.newValue);
    console.log(items);
    this.setState({
      items,
      newValue: ''
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
      editMode,
      items: this.props.templateItems
    });
  }
  handleCopy() {
    if (!this.props.isLoggedIn) {
      this.props.showModal('login');
      return;
    }
    this.props.showModal('copy', {
      author: this.props.uid,
      description: this.props.templateDescription,
      items: this.props.templateItems,
      title: this.props.templateTitle
    });
  }
  handleDelete() {
    this.props.showModal('deleteTemplate', {
      key: this.props.templateKey
    });
  }
  handleDeleteItem(index) {
    const items = this.state.items;
    items.splice(index, 1);
    this.setState({
      items
    });
  }
  handleSave() {
    console.log('save 1');
    if (!this.props.isLoggedIn) {
      this.props.showModal('login');
      return;
    }
    const templateObject = {
      author: this.props.uid,
      description: this.state.description || this.props.templateDescription,
      items: this.state.items || this.props.templateItems,
      title: this.state.title || this.props.templateTitle
    };
    console.log(templateObject);
    if (this.state.isNew) {
      firebase.database()
        .ref('/templates')
        .push(templateObject)
        .then(function getSnapshot(snapshot) {
          const newKey = snapshot.key;
          location.href = `/templates/${newKey}`;
        });
      return;
    }
    firebase.database()
      .ref(`/templates/${this.props.router.params.listType}`)
      .set({
        author: this.props.uid,
        description: this.state.description || this.props.templateDescription,
        items: this.state.items || this.props.templateItems,
        title: this.state.title || this.props.templateTitle
      })
      .then(function getSnapshot(snapshot) {
        this.setState({
          editMode: false
        });
        this.loadTemplate();
      }.bind(this));
  }

  handleTitleInput({ target: { value } }) {
    this.setState({
      title: value
    });
  }
  loadTemplate() {
    this.props.getTemplate(this.props.router.params.listType, this.props.uid);
  }
  toggleFavorite(e) {
    e.preventDefault();
    firebase.database()
      .ref(`/users/${this.props.uid}/favorites`)
      .once('value')
      .then(function getSnapshot(snapshot) {
        const favorites = snapshot.val() || [];
        if (!this.props.isFavorite && !favorites.includes(this.props.templateKey)) {
          favorites.push(this.props.templateKey);
        } else if (this.props.isFavorite && favorites.includes(this.props.templateKey)) {
          favorites.splice(favorites.indexOf(this.props.templateKey), 1);
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
    if (this.props.isExported) {
      return (
        <div>
          <section>
            <h2>All done!</h2>
            <p>
              You can view your new Trello board <b>{this.props.exportTitle}</b> here:
            </p>
            <p>
              <a href={this.props.exportUrl} target="_blank">{this.props.exportUrl}</a>
            </p>
          </section>
        </div>
      );
    }
    if (this.props.isLoading) {
      return (
        <section>
          <Loader />
        </section>
      );
    }
    return (
      <div className={styles.template}>
        <div
          className={styles.background}
          style={{
            backgroundImage: `url(images/graphics/${this.state.graphic}.svg)`
          }}
        />
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
              </div>
            )}
            {!this.state.editMode && (
              <div>
                {this.props.uid === this.props.templateAuthor && (
                  <span>
                    <IconButton
                      className={styles.editButton}
                      hint={(
                        <div>
                          <h6>Edit this template!</h6>
                        </div>
                      )}
                      onClick={() => this.toggleEditMode(true)}
                      size={32}
                      text="Edit"
                      title="edit this template!"
                      type="writing"
                    />
                    <IconButton
                      className={styles.editButton}
                      hint={(
                        <div>
                          <h6>Delete this template :(</h6>
                        </div>
                      )}
                      onClick={() => this.handleDelete()}
                      size={32}
                      text="Delete"
                      title="Delete this template"
                      type="garbage"
                    />
                  </span>
                )}
                <IconButton
                  className={styles.editButton}
                  hint={(
                    <div>
                      <h6>Add this template to your favorites.</h6>
                    </div>
                  )}
                  onClick={e => this.toggleFavorite(e)}
                  size={32}
                  text="Fave"
                  title="favorite this list!"
                  type={this.props.isFavorite ? 'heart' : 'heart-gray'}
                />
                <IconButton
                  className={styles.editButton}
                  hint={(
                    <div>
                      <h6>Duplicate this template and make it your own.</h6>
                    </div>
                  )}
                  onClick={() => this.handleCopy()}
                  size={32}
                  text="Copy"
                  title="copy this template!"
                  type="layer"
                />
                {/* <IconButton
                  className={styles.editButton}
                  onClick={() => this.handleShare()}
                  size={32}
                  title="share this template!"
                  type="share"
                /> */}
                <IconButton
                  className={styles.editButton}
                  hint={(
                    <div>
                      <h6>Send this template to Trello.</h6>
                    </div>
                  )}
                  onClick={() => this.handleExport()}
                  size={32}
                  text="Export"
                  title="export this template!"
                  type="send"
                />
              </div>
            )}
          </div>
          <h2>
            {this.state.editMode && (
              <input
                name="title"
                onChange={e => this.handleInput(e)}
                placeholder="Add a Title"
                value={this.state.title || this.props.templateTitle}
              />
            )}
            {!this.state.editMode && (
              <span>{this.props.templateTitle}</span>
            )}
          </h2>
          <p>
            {this.state.editMode && (
              <input
                name="description"
                onChange={e => this.handleInput(e)}
                placeholder="Add a Description"
                value={this.state.description || this.props.templateDescription}
              />
            )}
            {!this.state.editMode && (
              <span>{this.props.templateDescription}</span>
            )}
          </p>
          <ul className={styles.items}>
            {this.props.templateItems.map((item, index) => {
              return (
                <li key={`item-${index}`}>
                  {this.state.editMode && (
                    <div>
                      <input
                        name={index}
                        onChange={e => this.handleItemInput(e)}
                        type="text"
                        value={this.state.items[index] || item}
                      />
                      <IconButton
                        className={styles.deleteButton}
                        onClick={() => this.handleDeleteItem(index)}
                        size={24}
                        type="remove"
                      />
                    </div>
                  )}
                  {!this.state.editMode && (
                    <span>{item}</span>
                  )}
                </li>
              );
            })}
            {this.state.editMode && (
              <li>
                <input
                  onChange={e => this.handleNewInput(e)}
                  placeholder="Add an item to this list..."
                  type="text"
                  value={this.state.newValue}
                />
                <IconButton
                  className={styles.deleteButton}
                  onClick={() => this.handleNewSubmit()}
                  size={24}
                  type="add"
                />
              </li>
            )}
          </ul>
          <div className={styles.margin} />
        </section>
      </div>
    );
  }
}

TemplatePage.defaultProps = {
  exportTitle: '',
  exportUrl: '',
  getTemplate: () => {},
  listFavorites: () => {},
  isDeleted: false,
  isExported: false,
  isFavorite: false,
  isLoading: false,
  isLoggedIn: false,
  isSaved: false,
  newKey: '',
  push: () => {},
  resetTemplate: () => {},
  router: {},
  selectMenuItem: () => {},
  showModal: () => {},
  templateAuthor: '',
  templateDescription: '',
  templateItems: [],
  templateKey: '',
  templateTitle: '',
  uid: ''
};

TemplatePage.propTypes = {
  exportTitle: PropTypes.string,
  exportUrl: PropTypes.string,
  getTemplate: PropTypes.func,
  isDeleted: PropTypes.bool,
  isExported: PropTypes.bool,
  isFavorite: PropTypes.bool,
  isLoading: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  isSaved: PropTypes.bool,
  listFavorites: PropTypes.func,
  newKey: PropTypes.string,
  push: PropTypes.func,
  resetTemplate: PropTypes.func,
  router: PropTypes.object,
  selectMenuItem: PropTypes.func,
  showModal: PropTypes.func,
  templateAuthor: PropTypes.string,
  templateDescription: PropTypes.string,
  templateItems: PropTypes.array,
  templateKey: PropTypes.string,
  templateTitle: PropTypes.string,
  uid: PropTypes.string
};

function mapStateToProps(state) {
  return {
    exportTitle: state.export.title,
    exportUrl: state.export.url,
    isDeleted: state.deleteTemplate.isComplete,
    isExported: state.export.isComplete,
    isFavorite: state.user.favorites.includes(state.template.key),
    isSaved: state.copy.isComplete,
    isLoading: state.template.isLoading,
    isLoggedIn: state.user.isLoggedIn,
    newKey: state.copy.newKey,
    templateAuthor: state.template.author,
    templateDescription: state.template.description,
    templateItems: state.template.items,
    templateKey: state.template.key,
    templateTitle: state.template.title,
    uid: state.user.uid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTemplate: (key) => {
      dispatch(getTemplate(key));
    },
    listFavorites: (uid) => {
      dispatch(listFavorites(uid));
    },
    push: (url) => {
      dispatch(push(url));
    },
    resetTemplate: () => {
      dispatch(resetTemplate());
    },
    selectMenuItem: (selected) => {
      dispatch(selectMenuItem(selected));
    },
    showModal: (currentModal, data) => {
      dispatch(showModal(currentModal, data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplatePage);
