import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import styles from './Hint.sass';

class Hint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      top: 0
    };
  }
  componentDidMount() {
    const { left, top, height, width } = this.props.target.getBoundingClientRect();
    const rect = this.hint.getBoundingClientRect();
    this.setState({
      left: left - ((rect.width - width) / 2),
      top: top + height + 10
    });
  }
  render() {
    return (
      <div
        className={classNames(styles.hint, this.props.className)}
        ref={(hint) => { this.hint = hint; }}
        style={{
          left: this.state.left,
          top: this.state.top
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

Hint.defaultProps = {
  children: '',
  className: '',
  disabled: false,
  onClick: () => {},
  target: ''
};

Hint.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ]),
  className: PropTypes.string,
  target: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ])
};

export default Hint;
