import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';

import autologin from '../../actions/autologin';

import Header from '../../components/header/Header';
import Hint from '../../components/hint/Hint';
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
        {this.props.currentHint && (
          <Hint target={this.props.currentHintTarget}>
            {this.props.currentHint}
          </Hint>
        )}
      </div>
    );
  }
}

MainTemplate.defaultProps = {
  autologin: () => {},
  children: {},
  currentHint: '',
  currentHintTarget: '',
  currentModal: ''
};

MainTemplate.propTypes = {
  autologin: PropTypes.func,
  children: PropTypes.object,
  currentHint: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ]),
  currentHintTarget: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ]),
  currentModal: PropTypes.string
};

function mapStateToProps(state) {
  return {
    currentHint: state.hint.currentHint,
    currentHintTarget: state.hint.target,
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
