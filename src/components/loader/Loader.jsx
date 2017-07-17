import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Loader.sass';

class Loader extends React.Component {
  render() {
    return (
      <div
        className={classNames(styles.loader, this.props.className)}
      >
        <img alt="Loading..." src="images/icons/loader.gif" />
      </div>
    );
  }
}

Loader.defaultProps = {
  className: ''
};

Loader.propTypes = {
  className: PropTypes.string
};

export default Loader;
