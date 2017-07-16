import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';

import Button from '../../components/button/Button';
import Error from '../../components/error/Error';

import signup from '../../actions/signup';

import styles from './SignupForm.sass';

class SignupForm extends React.Component {
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
    this.props.signup(this.state.email, this.state.password);
  }
  render() {
    return (
      <div className={styles.signup}>
        <section>
          <div className={styles.signup}>
            <h2>Signup</h2>
            <Error>
              {this.props.error}
            </Error>
            <form onSubmit={e => this.handleSubmit(e)}>
              <label htmlFor="email">Email Address</label>
              <input name="email" onChange={e => this.handleInput(e)} type="text" value={this.state.email} />
              <label htmlFor="password">Password</label>
              <input name="password" onChange={e => this.handleInput(e)} type="password" value={this.state.password} />
              <Button>Sign Up</Button>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

SignupForm.defaultProps = {
  error: '',
  signup: () => {}
};

SignupForm.propTypes = {
  error: PropTypes.string,
  signup: PropTypes.func
};

function mapStateToProps(state) {
  return {
    error: state.user.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signup: (email, password) => {
      dispatch(signup(email, password));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
