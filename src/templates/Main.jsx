import React from 'react';
// import { Link } from 'react-router';

class MainContainer extends React.Component {
  render() {
    return (
      <div id="main-container">
        {/* {this.props.children} */}
        <h1>Hello World!</h1>
      </div>
    );
  }
}

MainContainer.defaultProps = {
  children: {}
};

MainContainer.propTypes = {
  children: React.PropTypes.object
};

export default MainContainer;
