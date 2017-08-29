import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Link } from 'react-router';
import React from 'react';


import styles from './Banner.sass';

class Banner extends React.Component {
  render() {
    return (
      <div
        className={classNames(styles.banner, this.props.className)}
        style={{
          backgroundColor: this.props.bgColor
        }}
      >
        <section>
          <div
            className={classNames(styles.info, styles[this.props.side])}
          >
            <h2 style={{ color: this.props.fgColor }}>
              {this.props.title}
            </h2>
            <div
              className={styles.image}
              style={{
                backgroundImage: `url(images/graphics/${this.props.graphic}.svg)`,
                left: this.props.side === 'right' ? 0 : 'auto',
                right: this.props.side === 'left' ? 0 : 'auto'
              }}
            />
            <p style={{ color: this.props.fgColor }}>{this.props.message}</p>
            <Link
              className={styles.button}
              to={this.props.buttonUrl}
              style={{
                border: `1px ${this.props.fgColor} solid`,
                color: this.props.fgColor,
                float: this.props.side
              }}
            >
              {this.props.buttonText}
            </Link>
          </div>
        </section>
      </div>
    );
  }
}

Banner.defaultProps = {
  children: '',
  className: ''
};

Banner.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string
};

export default Banner;
