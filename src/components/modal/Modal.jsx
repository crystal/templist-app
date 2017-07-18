import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';

import hideModal from '../../actions/hideModal';

import CopyForm from '../../forms/copy/CopyForm';
import DeleteTemplateForm from '../../forms/delete-template/DeleteTemplateForm';
import ExportForm from '../../forms/export/ExportForm';
import LoginForm from '../../forms/login/LoginForm';
import SignupForm from '../../forms/signup/SignupForm';

import styles from './Modal.sass';

class Modal extends React.Component {
  render() {
    return (
      <div>
        <button className={styles.bg} onClick={() => this.props.hideModal()} />
        <div className={styles.modal}>
          <button className={styles.close} onClick={() => this.props.hideModal()}>x</button>
          {this.props.currentModal === 'copy' && (
            <CopyForm />
          )}
          {this.props.currentModal === 'deleteTemplate' && (
            <DeleteTemplateForm />
          )}
          {this.props.currentModal === 'export' && (
            <ExportForm />
          )}
          {this.props.currentModal === 'login' && (
            <LoginForm />
          )}
          {this.props.currentModal === 'signup' && (
            <SignupForm />
          )}
          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  children: <div />,
  currentModal: '',
  hideModal: () => {}
};

Modal.propTypes = {
  children: PropTypes.object,
  currentModal: PropTypes.string,
  hideModal: PropTypes.func
};

function mapStateToProps(state) {
  return {
    currentModal: state.modal.currentModal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideModal: () => {
      dispatch(hideModal());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
