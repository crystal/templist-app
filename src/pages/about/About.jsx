import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import selectMenuItem from '../../actions/selectMenuItem';

import styles from './About.sass';

class AboutPage extends Component {
  componentWillMount() {
    this.props.selectMenuItem('about');
  }
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

AboutPage.defaultProps = {
  selectMenuItem: () => {}
};

AboutPage.propTypes = {
  selectMenuItem: PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return {
    selectMenuItem: (selected) => {
      dispatch(selectMenuItem(selected));
    }
  };
}

export default connect(null, mapDispatchToProps)(AboutPage);
