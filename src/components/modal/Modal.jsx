import React from 'react';

import { connect } from 'react-redux';

import hideModal from '../../actions/hideModal';
import Login from '../login/Login';

import styles from './Modal.sass';

class Modal extends React.Component {
  render() {
    return (
      <div>
        <button className={styles.bg} onClick={() => this.props.hideModal()} />
        <div className={styles.modal}>
          <button onClick={() => this.props.hideModal()}>Close</button>
          <Login />
          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  children: <div />,
  hideModal: () => {}
};

Modal.propTypes = {
  children: React.PropTypes.object,
  hideModal: React.PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return {
    hideModal: () => {
      dispatch(hideModal());
    }
  };
}

export default connect(null, mapDispatchToProps)(Modal);
