import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';

import autologin from '../../actions/autologin';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Modal from '../../components/modal/Modal';

import styles from './Main.sass';

class MainTemplate extends React.Component {
  componentWillMount() {
    this.props.autologin();
  }
  render() {
    return (
      <div className={styles.main}>
        <Header />
        {this.props.children}
        <Footer />
        {this.props.currentModal && (
          <Modal />
        )}
      </div>
    );
  }
}

MainTemplate.defaultProps = {
  autologin: () => {},
  children: {},
  currentModal: ''
};

MainTemplate.propTypes = {
  autologin: PropTypes.func,
  children: PropTypes.object,
  currentModal: PropTypes.string
};

function mapStateToProps(state) {
  return {
    currentModal: state.modal.currentModal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autologin: (currentModal) => {
      dispatch(autologin(currentModal));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainTemplate);
