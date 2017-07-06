import React from 'react';

import Header from '../../components/header/Header';

import styles from './Main.sass';

class MainTemplate extends React.Component {
  render() {
    return (
      <div className={styles.main}>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

MainTemplate.defaultProps = {
  children: {}
};

MainTemplate.propTypes = {
  children: React.PropTypes.object
};

export default MainTemplate;
