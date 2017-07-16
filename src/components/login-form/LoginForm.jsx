import React from 'react';

import { connect } from 'react-redux';

import Button from '../button/Button';
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
  login: () => {}
};

LoginForm.propTypes = {
  login: React.PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return {
    login: (email, password) => {
      dispatch(login(email, password));
    }
  };
}

export default connect(null, mapDispatchToProps)(LoginForm);
