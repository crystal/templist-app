import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Error.sass';

class Error extends React.Component {
  render() {
    if (!this.props.children) {
      return null;
    }
    return (
      <div
        className={classNames(styles.error, this.props.className)}
      >
        {this.props.children}
      </div>
    );
  }
}

Error.defaultProps = {
  children: '',
  className: ''
};

Error.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string
};

export default Error;
