import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Button.sass';

class Button extends React.Component {
  render() {
    return (
      <button
        className={classNames(styles.button, this.props.className)}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

Button.defaultProps = {
  children: '',
  className: '',
  disabled: false,
  onClick: () => {}
};

Button.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default Button;
