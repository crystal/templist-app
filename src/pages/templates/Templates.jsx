import React from 'react';

import styles from './Templates.sass';

class TemplatePage extends React.Component {
  render() {
    return (
      <div className={styles.templates}>
        <section>
          <h1>Templates</h1>
          <p>This is some text.</p>
        </section>
      </div>
    );
  }
}

export default TemplatePage;
