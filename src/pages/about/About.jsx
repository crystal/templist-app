import React from 'react';

import styles from './About.sass';

class AboutPage extends React.Component {
  render() {
    return (
      <div className={styles.about}>
        <section>
          <div className={styles.about}>
            <h1>About</h1>
            <p>This is some text.</p>
          </div>
        </section>
      </div>
    );
  }
}

export default AboutPage;
