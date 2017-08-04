import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router';

import logout from '../../actions/logout';
import showModal from '../../actions/showModal';

import IconButton from '../../components/icon-button/IconButton';
import Popover from '../../components/popover/Popover';

import styles from './Header.sass';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopover: ''
    };
  }
  togglePopover(show) {
    this.setState({
      showPopover: show === this.state.showPopover ? '' : show
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
            </ul>
            {this.props.email && (
              <ul className={styles.account}>
                <li>
                  <button className={styles.link} onClick={() => this.togglePopover('account')}>
                    Hi, {this.props.email}
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
            <IconButton
              className={styles.mainMenu}
              onClick={() => this.togglePopover('main')}
              size={32}
              type="menu"
            />
            <IconButton
              className={styles.accountMenu}
              onClick={() => this.togglePopover('account')}
              size={32}
              type="user"
            />
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
            {this.state.showPopover === 'account' && (this.props.email) && (
              <ul>
                <li>
                  <Link
                    className={classNames(styles.link, this.props.selectedMenuItem === 'newTemplate' ? styles.selected : null)}
                    to="my/templates/new"
                  >
                    Create a New Template
                  </Link>
                </li>
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
            )}
            {this.state.showPopover === 'account' && (!this.props.email) && (
              <ul>
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
            {this.state.showPopover === 'main' && (
              <ul>
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
              </ul>
            )}
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
