import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router';

import showModal from '../../actions/showModal';

import styles from './Header.sass';

class Header extends React.Component {
  render() {
    return (
      <div className={styles.header}>
        <section>
          <ul className={styles.menu}>
            <li>
              <Link className={styles.link} to="browse">Browse</Link>
            </li>
            <li>
              <Link className={styles.link} to="about">About</Link>
            </li>
          </ul>
          {this.props.email && (
            <ul className={styles.account}>
              <li>
                <Link className={styles.link} to="profile">{this.props.email}</Link>
              </li>
            </ul>
          )}
          {!this.props.email && (
            <ul className={styles.account}>
              <li>
                <button className={styles.link} onClick={() => this.props.showModal('login')}>
                  Login
                </button>
              </li>
              <li>
                <button className={styles.link} onClick={() => this.props.showModal('signup')}>
                  Sign Up
                </button>
              </li>
            </ul>
          )}
          <div className={styles.headerLogo}>
            <h1>
              <Link className={styles.link} to="/">TL</Link>
            </h1>
          </div>
        </section>
      </div>
    );
  }
}

Header.defaultProps = {
  email: '',
  showModal: () => {}
};

Header.propTypes = {
  email: React.PropTypes.func,
  showModal: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    email: state.user.email
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showModal: (currentModal) => {
      dispatch(showModal(currentModal));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
