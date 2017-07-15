import React from 'react';

import styles from './Button.sass';

class Button extends React.Component {
  render() {
    return (
      <button className={styles.button}>
        {this.props.children}
      </button>
    );
  }
}

Button.defaultProps = {
  children: <span />
};

Button.propTypes = {
  children: React.PropTypes.object
};

export default Button;
