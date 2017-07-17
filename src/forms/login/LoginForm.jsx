import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';

import Button from '../../components/button/Button';
import Error from '../../components/error/Error';

import login from '../../actions/login';

import styles from './LoginForm.sass';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }
  handleInput({ target: { name, value } }) {
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
  }
  render() {
    return (
      <div className={styles.login}>
        <section>
          <div className={styles.login}>
            <h2>Login</h2>
            <Error>
              {this.props.error}
            </Error>
            <form onSubmit={e => this.handleSubmit(e)}>
              <label htmlFor="email">Email Address</label>
              <input name="email" onChange={e => this.handleInput(e)} type="text" value={this.state.email} />
              <label htmlFor="password">Password</label>
              <input name="password" onChange={e => this.handleInput(e)} type="password" value={this.state.password} />
              <Button>Login</Button>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

LoginForm.defaultProps = {
  error: '',
  isLoading: false,
  login: () => {}
};

LoginForm.propTypes = {
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  login: PropTypes.func
};

function mapStateToProps(state) {
  return {
    error: state.user.error,
    isLoading: state.user.isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (email, password) => {
      dispatch(login(email, password));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
