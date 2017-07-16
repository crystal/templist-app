import classNames from 'classnames';
import React from 'react';

import styles from './IconButton.sass';

class IconButton extends React.Component {
  render() {
    return (
      <button
        className={classNames(styles.button, this.props.className)}
        onClick={this.props.onClick}
        style={{
          backgroundImage: `url(images/icons/${this.props.type}.svg)`,
          height: this.props.size,
          width: this.props.size
        }}
      >
        {this.props.children}
      </button>
    );
  }
}

IconButton.defaultProps = {
  children: <span />,
  className: '',
  onClick: () => {},
  size: 16,
  type: ''
};

IconButton.propTypes = {
  children: React.PropTypes.object,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
  size: React.PropTypes.number,
  type: React.PropTypes.string
};

export default IconButton;
