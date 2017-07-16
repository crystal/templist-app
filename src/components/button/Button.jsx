import classNames from 'classnames';
import React from 'react';

import styles from './Button.sass';

class Button extends React.Component {
  render() {
    return (
      <button
        className={classNames(styles.button, this.props.className)}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

Button.defaultProps = {
  children: <span />,
  className: '',
  onClick: () => {}
};

Button.propTypes = {
  children: React.PropTypes.object,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func
};

export default Button;