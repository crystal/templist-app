import React from 'react';

import styles from './Login.sass';

class Login extends React.Component {
  render() {
    return (
      <div className={styles.login}>
        <section>
          <div className={styles.login}>
            <h2>Login</h2>
            <form>
              <label htmlFor="email">Email Address</label>
              <input name="email" />
              <label htmlFor="password">Password</label>
              <input name="password" />
              <button>Login</button>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

export default Login;
