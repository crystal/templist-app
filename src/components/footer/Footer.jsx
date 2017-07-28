import React from 'react';

import { Link } from 'react-router';

import styles from './Footer.sass';

class Footer extends React.Component {
  render() {
    return (
      <div className={styles.footer}>
        <section>
          <div className={styles.footer}>
            <h3><Link to="/">TempLists</Link></h3>
            <p>&copy; 2017 TempLists. All Rights Reserved.</p>
          </div>
        </section>
      </div>
    );
  }
}

export default Footer;
