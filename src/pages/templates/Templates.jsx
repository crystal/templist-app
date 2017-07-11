import React from 'react';

import styles from './Templates.sass';

class TemplatePage extends React.Component {
  render() {
    return (
      <div className={styles.templates}>
        <section>
          <h1>Templates</h1>
          <ul className={styles.tiles}>
            <li>
              <div className={styles.tile}>
                <h3>Card 1</h3>
                <p>description</p>
              </div>
            </li>
            <li>
              <div className={styles.tile}>
                <h3>Card 2</h3>
                <p>description</p>
              </div>
            </li>
            <li>
              <div className={styles.tile}>
                <h3>Card 3</h3>
                <p>description</p>
              </div>
            </li>
            <li>
              <div className={styles.tile}>
                <h3>Card 4</h3>
                <p>description</p>
              </div>
            </li>
            <li>
              <div className={styles.tile}>
                <h3>Card 5</h3>
                <p>description</p>
              </div>
            </li>
            <li>
              <div className={styles.tile}>
                <h3>Card 6</h3>
                <p>description</p>
              </div>
            </li>
            <li>
              <div className={styles.tile}>
                <h3>Card 7</h3>
                <p>description</p>
              </div>
            </li>
            <li>
              <div className={styles.tile}>
                <h3>Card 8</h3>
                <p>description</p>
              </div>
            </li>
            <li>
              <div className={styles.tile}>
                <h3>Card 9</h3>
                <p>description</p>
              </div>
            </li>

          </ul>
        </section>
      </div>
    );
  }
}

export default TemplatePage;
