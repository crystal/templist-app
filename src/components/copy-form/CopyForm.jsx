import React from 'react';

import { connect } from 'react-redux';

import Button from '../button/Button';
import Error from '../error/Error';

import copy from '../../actions/copy';

import styles from './CopyForm.sass';

class CopyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: ''
    };
  }
  handleInput({ target: { name, value } }) {
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.copy({
      author: this.props.uid,
      description: this.state.description || this.props.originalDescription,
      items: this.props.originalItems,
      title: this.state.title || this.props.originalTitle
    });
  }
  render() {
    return (
      <div className={styles.login}>
        <section>
          <div className={styles.login}>
            <h2>Copy Template</h2>
            <p>Create a template based off <b>{this.props.originalTitle}</b></p>
            <Error>
              {this.props.error}
            </Error>
            <form onSubmit={e => this.handleSubmit(e)}>
              <label htmlFor="title">Title</label>
              <input name="title" onChange={e => this.handleInput(e)} type="text" value={this.state.title || this.props.originalTitle} />
              <label htmlFor="description">Description</label>
              <input name="description" onChange={e => this.handleInput(e)} type="text" value={this.state.description || this.props.originalDescription} />
              <Button>Copy</Button>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

CopyForm.defaultProps = {
  copy: () => {},
  error: '',
  originalTitle: '',
  originalDescription: '',
  originalItems: [],
  uid: ''
};

CopyForm.propTypes = {
  copy: React.PropTypes.func,
  error: React.PropTypes.string,
  originalTitle: React.PropTypes.string,
  originalDescription: React.PropTypes.string,
  originalItems: React.PropTypes.array,
  uid: React.PropTypes.string
};

function mapStateToProps(state) {
  return {
    error: state.user.error,
    originalTitle: state.copy.originalTitle,
    originalDescription: state.copy.originalDescription,
    originalItems: state.copy.originalItems,
    uid: state.user.uid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    copy: (template) => {
      dispatch(copy(template));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CopyForm);
