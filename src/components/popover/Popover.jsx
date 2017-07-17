import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Popover.sass';

class Popover extends React.Component {
  render() {
    return (
      <div
        className={classNames(styles.popover, this.props.className)}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </div>
    );
  }
}

Popover.defaultProps = {
  children: <ul />,
  className: '',
  onClick: () => {}
};

Popover.propTypes = {
  children: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Popover;
