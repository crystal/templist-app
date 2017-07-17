import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';

import Button from '../../components/button/Button';
import Error from '../../components/error/Error';

import exportTemplate from '../../actions/exportTemplate';

import styles from './ExportForm.sass';

class ExportForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }
  handleInput({ target: { name, value } }) {
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.exportTemplate({
      items: this.props.originalItems,
      title: this.state.title || this.props.originalTitle
    });
  }
  render() {
    return (
      <div className={styles.export}>
        <section>
          <div className={styles.export}>
            <h2>Export Template</h2>
            <Error>
              {this.props.error}
            </Error>
            <form onSubmit={e => this.handleSubmit(e)}>
              <label htmlFor="title">Title</label>
              <input name="title" onChange={e => this.handleInput(e)} type="text" value={this.state.title || this.props.originalTitle} />
              <Button disabled={this.props.isLoading}>
                {this.props.isLoading ? 'Loading...' : 'Export'}
              </Button>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

ExportForm.defaultProps = {
  error: '',
  exportTemplate: () => {},
  isLoading: false,
  originalTitle: '',
  originalItems: []
};

ExportForm.propTypes = {
  error: PropTypes.string,
  exportTemplate: PropTypes.func,
  isLoading: PropTypes.bool,
  originalTitle: PropTypes.string,
  originalItems: PropTypes.array
};

function mapStateToProps(state) {
  return {
    error: state.export.error,
    isLoading: state.export.isLoading,
    originalTitle: state.export.originalTitle,
    originalItems: state.export.originalItems
  };
}

function mapDispatchToProps(dispatch) {
  return {
    exportTemplate: (template) => {
      dispatch(exportTemplate(template));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExportForm);
