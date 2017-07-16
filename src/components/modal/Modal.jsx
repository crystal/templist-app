import React from 'react';

import { connect } from 'react-redux';

import hideModal from '../../actions/hideModal';
import LoginForm from '../login-form/LoginForm';
import SignupForm from '../signup-form/SignupForm';

import styles from './Modal.sass';

class Modal extends React.Component {
  render() {
    return (
      <div>
        <button className={styles.bg} onClick={() => this.props.hideModal()} />
        <div className={styles.modal}>
          <button onClick={() => this.props.hideModal()}>Close</button>
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
  children: React.PropTypes.object,
  currentModal: React.PropTypes.string,
  hideModal: React.PropTypes.func
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
