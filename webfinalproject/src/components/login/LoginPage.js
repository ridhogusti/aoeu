import React from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import LoginForm from './LoginForm';

class LoginPage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentWillMount() {
    if (this.props.isAuthenticated) {
      console.log('oetuh');
      this.props.history.push('/');
    } 
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <LoginForm />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}
export default connect(mapStateToProps, {})(LoginPage);
