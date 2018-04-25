import React from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import './stylelogin.css';

class LoginPage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentWillMount() {
    window.scrollTo(0, 0);
    if (this.props.isAuthenticated) {
      console.log('oetuh');
      this.props.history.push('/');
    } 
  }
  render() {
    return (
      <div className="break">
        <div className="row">
          <div className="col-4" />
          <div className="col-4">
            <br />
            <LoginForm />
          </div>
          <div className="col-4" />
        
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
