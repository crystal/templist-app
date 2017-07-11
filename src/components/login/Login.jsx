import React from 'react';

import styles from './Login.sass';

class Login extends React.Component {
  render() {
    return (
      <div className={styles.login}>
        <section>
          <div className={styles.login}>
            <h1>Login</h1>
            <form>
              <label htmlFor="email">Email Address</label>
              <input name="email" />
              <label htmlFor="password">Password</label>
              <input name="password" />
            </form>
          </div>
        </section>
      </div>
    );
  }
}

export default Login;
