import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router';

import logout from '../../actions/logout';
import showModal from '../../actions/showModal';

import Popover from '../../components/popover/Popover';

import styles from './Header.sass';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopover: false
    };
  }
  togglePopover(show) {
    this.setState({
      showPopover: show !== undefined ? show : !this.state.showPopover
    });
  }
  render() {
    return (
      <div>
        <div className={styles.header}>
          <section>
            <ul className={styles.menu}>
              <li>
                <Link
                  className={classNames(styles.link, this.props.selectedMenuItem === 'home' ? styles.selected : null)}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={classNames(styles.link, this.props.selectedMenuItem === 'featured' ? styles.selected : null)}
                  to="featured"
                >
                  Featured
                </Link>
              </li>
              <li>
                <Link
                  className={classNames(styles.link, this.props.selectedMenuItem === 'browse' ? styles.selected : null)}
                  to="browse"
                >
                  Browse
                </Link>
              </li>
              <li>
                <Link
                  className={classNames(styles.link, this.props.selectedMenuItem === 'about' ? styles.selected : null)}
                  to="about"
                >
                  About
                </Link>
              </li>
            </ul>
            {this.props.email && (
              <ul className={styles.account}>
                <li>
                  <button className={styles.link} onClick={() => this.togglePopover()}>
                    Welcome back, {this.props.email}
                  </button>
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
                <Link className={styles.link} to="/">
                  TempLists
                </Link>
              </h1>
            </div>
          </section>
        </div>
        {this.state.showPopover && (
          <Popover onClick={() => this.togglePopover(false)}>
            <ul>
              <li>
                <Link
                  className={classNames(styles.link, this.props.selectedMenuItem === 'myTemplates' ? styles.selected : null)}
                  to="my/templates"
                >
                  My Templates
                </Link>
              </li>
              <li>
                <Link
                  className={classNames(styles.link, this.props.selectedMenuItem === 'myFavorites' ? styles.selected : null)}
                  to="my/favorites"
                >
                  Favorites
                </Link>
              </li>
              <li>
                <button className={styles.link} onClick={() => this.props.logout()}>
                  Logout
                </button>
              </li>
            </ul>
          </Popover>
        )}
      </div>
    );
  }
}

Header.defaultProps = {
  email: '',
  logout: () => {},
  selectedMenuItem: '',
  showModal: () => {}
};

Header.propTypes = {
  email: PropTypes.string,
  logout: PropTypes.func,
  selectedMenuItem: PropTypes.string,
  showModal: PropTypes.func
};

function mapStateToProps(state) {
  return {
    email: state.user.email,
    selectedMenuItem: state.menu.selected
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(logout());
    },
    showModal: (currentModal) => {
      dispatch(showModal(currentModal));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
