import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import hideHint from '../../actions/hideHint';
import showHint from '../../actions/showHint';

import styles from './IconButton.sass';

class IconButton extends React.Component {
  render() {
    return (
      <button
        className={classNames(styles.button, this.props.className)}
        onClick={this.props.onClick}
        onMouseDown={() => this.props.hideHint()}
        onMouseEnter={event => this.props.showHint(this.props.hint, event.target)}
        onMouseLeave={() => this.props.hideHint()}
        style={{
          backgroundImage: `url(images/icons/${this.props.type}.svg)`,
          height: this.props.size,
          width: this.props.size
        }}
        // title={this.props.title}
      >
        {this.props.children}
      </button>
    );
  }
}

IconButton.defaultProps = {
  children: <span />,
  className: '',
  hideHint: () => {},
  hint: '',
  onClick: () => {},
  showHint: () => {},
  size: 16,
  title: '',
  type: ''
};

IconButton.propTypes = {
  children: PropTypes.object,
  className: PropTypes.string,
  hideHint: PropTypes.func,
  hint: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ]),
  onClick: PropTypes.func,
  showHint: PropTypes.func,
  size: PropTypes.number,
  title: PropTypes.string,
  type: PropTypes.string
};

function mapDispatchToProps(dispatch) {
  return {
    hideHint: () => {
      dispatch(hideHint());
    },
    showHint: (currentHint, target) => {
      dispatch(showHint(currentHint, target));
    }
  };
}

export default connect(null, mapDispatchToProps)(IconButton);
