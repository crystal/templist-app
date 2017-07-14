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
          <div className={styles.headerLogo}>
            <h1>
              <Link to="/">Templist</Link>
            </h1>
          </div>
          <ul className={styles.menu}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="browse">Browse</Link>
            </li>
            <li>
              <Link to="about">About</Link>
            </li>
          </ul>
          {this.props.email && (
            <ul className={styles.account}>
              <li>
                {this.props.email}
              </li>
            </ul>
          )}
          {!this.props.email && (
            <ul className={styles.account}>
              <li>
                <button onClick={() => this.props.showModal('login')}>Login</button>
              </li>
              <li>
                <button onClick={() => this.props.showModal('signup')}>Sign Up</button>
              </li>
            </ul>
          )}
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
