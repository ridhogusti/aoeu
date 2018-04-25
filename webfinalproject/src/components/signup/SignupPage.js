import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm';
import './stylesignup.css';
import { userSignupRequest, isUserExists } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages.js';

class SignupPage extends React.Component {
  componentWillMount() {
    window.scrollTo(0, 0);
    if (this.props.isAuthenticated) {
      this.props.history.push('/');
    } 
  }
  render() {
    const { userSignupRequest, addFlashMessage, isUserExists } = this.props;
    return (
      <div className="break">
        <div className="row">
          <div className="col-4" />
          <div className="col-4">
            <br />
            <SignupForm
              isUserExists={isUserExists}
              userSignupRequest={userSignupRequest}
              addFlashMessage={addFlashMessage}
            />
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
SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { userSignupRequest, addFlashMessage, isUserExists })(SignupPage);
