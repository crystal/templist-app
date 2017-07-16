import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';

import Button from '../../components/button/Button';
import Error from '../../components/error/Error';

import deleteTemplate from '../../actions/deleteTemplate';

import styles from './DeleteTemplateForm.sass';

class DeleteTemplateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmation: ''
    };
  }
  handleInput({ target: { name, value } }) {
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.deleteTemplate(
      this.props.templateKey
    );
  }
  render() {
    return (
      <div className={styles.login}>
        <section>
          <div className={styles.login}>
            <h2>Delete Template</h2>
            <p>Are you sure you want to delete <b>{this.props.originalTitle}</b>?</p>
            <Error>
              {this.props.error}
            </Error>
            <form onSubmit={e => this.handleSubmit(e)}>
              <label htmlFor="confirmation">Type DELETE in all caps to confirm.</label>
              <input name="confirmation" onChange={e => this.handleInput(e)} type="text" value={this.state.confirmation} />
              <Button disabled={this.state.confirmation !== 'DELETE'}>Confirm</Button>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

DeleteTemplateForm.defaultProps = {
  deleteTemplate: () => {},
  error: '',
  templateKey: ''
};

DeleteTemplateForm.propTypes = {
  deleteTemplate: PropTypes.func,
  error: PropTypes.string,
  templateKey: PropTypes.string
};

function mapStateToProps(state) {
  return {
    error: state.user.error,
    templateKey: state.deleteTemplate.key
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteTemplate: (templateKey) => {
      dispatch(deleteTemplate(templateKey));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTemplateForm);
