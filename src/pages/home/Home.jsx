import React from 'react';

import styles from './Home.sass';

class HomePage extends React.Component {
  render() {
    return (
      <div className={styles.home}>
        <section>
          <h1>Home</h1>
          <p>This is some text.</p>
        </section>
      </div>
    );
  }
}

export default HomePage;
