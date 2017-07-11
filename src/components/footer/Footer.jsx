import React from 'react';

import { Link } from 'react-router';

import styles from './Footer.sass';

class Footer extends React.Component {
  render() {
    return (
      <div className={styles.footer}>
        <section>
          <div className={styles.footer}>
            <h1>Footer!!</h1>
          </div>
        </section>
      </div>
    );
  }
}

export default Footer;
