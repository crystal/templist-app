import React from 'react';

import { connect } from 'react-redux';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Modal from '../../components/modal/Modal';

import styles from './Main.sass';

class MainTemplate extends React.Component {
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
  children: {},
  currentModal: ''
};

MainTemplate.propTypes = {
  children: React.PropTypes.object,
  currentModal: React.PropTypes.string
};

function mapStateToProps(state) {
  return {
    currentModal: state.modal.currentModal
  };
}

export default connect(mapStateToProps)(MainTemplate);
