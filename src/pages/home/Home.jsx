import React from 'react';

import styles from './Home.sass';

class HomePage extends React.Component {
  render() {
    return (
      <div className={styles.home}>
        <section>
          <div className={styles.home}>
            <h1>Home</h1>
            <p>This is some text.</p>
          </div>
        </section>
      </div>
    );
  }
}

export default HomePage;
