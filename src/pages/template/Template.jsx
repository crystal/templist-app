import firebase from 'firebase';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import resetTemplate from '../../actions/resetTemplate';
import showModal from '../../actions/showModal';

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
      isSubmitting: false,

      author: '',
      description: '',
      key: '',
      newTitle: '',
      items: [],
      title: ''
    };
  }
  componentWillMount() {
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
    this.props.showModal('export', {
      author: this.props.uid,
      description: this.state.description,
      items: this.state.items,
      title: this.state.title
    });
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
  handleCopy() {
    if (!this.props.isLoggedIn) {
      this.props.showModal('login');
      return;
    }
    this.props.showModal('copy', {
      author: this.props.uid,
      description: this.state.description,
      items: this.state.items,
      title: this.state.title
    });
  }
  handleDelete() {
    this.props.showModal('deleteTemplate', {
      key: this.state.key
    });
  }
  handleSave() {
    if (!this.props.isLoggedIn) {
      this.props.showModal('login');
      return;
    }
    firebase.database()
      .ref(`/templates/${this.props.router.params.listType}`)
      .set({
        author: this.props.uid,
        description: this.state.description,
        items: this.state.items,
        title: this.state.title
      })
      .then(function getSnapshot(snapshot) {
        window.reload();
      }.bind(this));
  }

  handleTitleInput({ target: { value } }) {
    this.setState({
      title: value
    });
  }
  loadTemplate() {
    firebase.database()
      .ref(`/templates/${this.props.router.params.listType}`)
      .once('value')
      .then(function getSnapshot(snapshot) {
        const template = snapshot.val();
        this.setState({
          isLoading: false,
          author: template.author,
          description: template.description,
          items: template.items,
          key: this.props.router.params.listType,
          title: template.title
        });
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
                {this.props.uid === this.state.author && (
                  <span>
                    <IconButton
                      className={styles.editButton}
                      onClick={() => this.toggleEditMode(true)}
                      size={32}
                      title="edit this template!"
                      type="writing"
                    />
                    <IconButton
                      className={styles.editButton}
                      onClick={() => this.handleDelete()}
                      size={32}
                      title="Delete this template"
                      type="garbage"
                    />
                  </span>
                )}
                <IconButton
                  className={styles.editButton}
                  onClick={() => this.handleCopy()}
                  size={32}
                  title="copy this template!"
                  type="layer"
                />
                <IconButton
                  className={styles.editButton}
                  onClick={() => this.handleShare()}
                  size={32}
                  title="share this template!"
                  type="share"
                />
                <IconButton
                  className={styles.editButton}
                  onClick={() => this.handleExport()}
                  size={32}
                  title="export this template!"
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
                <li key={`item-${index}`}>
                  {this.state.editMode && (
                    <div>
                      <input name={index} onChange={e => this.handleInput(e)} type="text" value={item} />
                      <button
                        className={styles.deleteButton}
                        onClick={() => this.handleDelete(index)}
                      >
                        delete
                      </button>
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
  exportTitle: '',
  exportUrl: '',
  isDeleted: false,
  isExported: false,
  isLoggedIn: false,
  isSaved: false,
  newKey: '',
  push: () => {},
  resetTemplate: () => {},
  router: {},
  showModal: () => {},
  uid: ''
};

TemplatePage.propTypes = {
  exportTitle: PropTypes.string,
  exportUrl: PropTypes.string,
  isDeleted: PropTypes.bool,
  isExported: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  isSaved: PropTypes.bool,
  newKey: PropTypes.string,
  push: PropTypes.func,
  resetTemplate: PropTypes.func,
  router: PropTypes.object,
  showModal: PropTypes.func,
  uid: PropTypes.string
};

function mapStateToProps(state) {
  return {
    exportTitle: state.export.title,
    exportUrl: state.export.url,
    isDeleted: state.deleteTemplate.isComplete,
    isExported: state.export.isComplete,
    isSaved: state.copy.isComplete,
    isLoggedIn: state.user.isLoggedIn,
    newKey: state.copy.newKey,
    uid: state.user.uid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    push: (url) => {
      dispatch(push(url));
    },
    resetTemplate: () => {
      dispatch(resetTemplate());
    },
    showModal: (currentModal, data) => {
      dispatch(showModal(currentModal, data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplatePage);
