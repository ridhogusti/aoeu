import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// import map from 'lodash/map';
// import classnames from 'classnames';
// import timezones from '../../data/timezones';
import validateInput from '../validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      akses: '',
      passwordConfirmation: '',
      timezone: '',
      errors: {},
      isLoading: false,
      invalid: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { username, email, password, name } = this.state;

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      console.log(this.state);
      const data = {
        username,
        email,
        password,
        akses: 'umat',
        name,
      };
      console.log(data);
      this.props.userSignupRequest(data).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You signed up successfully. Welcome!',
          });
          this.props.history.push('/');
        },
        (err) => this.setState({ errors: err.response.data, isLoading: false })
      );
    }
  }

  checkUserExists(e) {
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      this.props.isUserExists(val).then(res => {
        const errors = this.state.errors;
        let invalid;
        if (res.data.user) {
          errors[field] = `There is user with such ${field}`;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  }
  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  render() {
    const { errors } = this.state;
    return (

      <div className="card">
        <div className="card-body">
          {/* Header*/}
          <div className="form-header default-color">
            <h3><i className="fa fa-user" /> Register:</h3>
          </div>
          {/* Body*/}
          <form onSubmit={this.onSubmit}>

            <TextFieldGroup
              id="name"
              error={errors.name}
              label="Name"
              onChange={this.onChange}
              checkUserExists={this.checkUserExists}
              value={this.state.name}
              field="name"
              icon="fa fa-user prefix grey-text"
            />
            <TextFieldGroup
              id="username"
              error={errors.username}
              label="Username"
              onChange={this.onChange}
              checkUserExists={this.checkUserExists}
              value={this.state.username}
              field="username"
              icon="fa fa-user prefix grey-text"
            />

            <TextFieldGroup
              id="email"
              error={errors.email}
              label="Email"
              onChange={this.onChange}
              checkUserExists={this.checkUserExists}
              value={this.state.email}
              field="email"
              icon="fa fa-envelope prefix grey-text"
            />

            <TextFieldGroup
              id="password"
              error={errors.password}
              label="Password"
              onChange={this.onChange}
              value={this.state.password}
              field="password"
              type="password"
              icon="fa fa-lock prefix grey-text"
            />

            <TextFieldGroup
              id="passwordConfirmation"
              error={errors.passwordConfirmation}
              label="Password Confirmation"
              onChange={this.onChange}
              value={this.state.passwordConfirmation}
              field="passwordConfirmation"
              type="password"
              icon="fa fa-lock prefix grey-text"
            />

            <div className="text-center">
              <button className="btn btn-deep-orange waves-effect waves-light">Sign up</button>
            </div>
          </form>
          
        </div>
      </div>

      // <form onSubmit={this.onSubmit} encType="multipart/form-data" >
      //   <h1>Join our community!</h1>

      //   <TextFieldGroup
      //     error={errors.username}
      //     label="Username"
      //     onChange={this.onChange}
      //     checkUserExists={this.checkUserExists}
      //     value={this.state.username}
      //     field="username"
      //   />

      //   <TextFieldGroup
      //     error={errors.email}
      //     label="Email"
      //     onChange={this.onChange}
      //     checkUserExists={this.checkUserExists}
      //     value={this.state.email}
      //     field="email"
      //   />

      //   <TextFieldGroup
      //     error={errors.password}
      //     label="Password"
      //     onChange={this.onChange}
      //     value={this.state.password}
      //     field="password"
      //     type="password"
      //   />

      //   <TextFieldGroup
      //     error={errors.passwordConfirmation}
      //     label="Password Confirmation"
      //     onChange={this.onChange}
      //     value={this.state.passwordConfirmation}
      //     field="passwordConfirmation"
      //     type="password"
      //   />

      //   {/* <div className={classnames('form-group', { 'has-error': errors.timezone })}>
      //     <label className="control-label">Timezone</label>
      //     <select
      //       className="form-control"
      //       name="timezone"
      //       onChange={this.onChange}
      //       value={this.state.timezone}
      //     >
      //       <option value="" disabled>Choose Your Timezone</option>
      //       {options}
      //     </select>
      //     {errors.timezone && <span className="help-block">{errors.timezone}</span>}
      //   </div> */}

      //   <div className="form-group">
      //     <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">
      //       Sign up
      //     </button>
      //   </div>
      // </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired,
};

SignupForm.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default withRouter(SignupForm);
