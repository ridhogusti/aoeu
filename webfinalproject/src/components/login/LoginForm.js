import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../validations/login';
import { login } from '../../actions/authActions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      const { identifier, password } = this.state;
      const data = {
        email: identifier,
        password,
      };
      this.setState({ errors: {}, isLoading: true });
      this.props.login(data).then(
        // (res) => this.props.history.push('/'),
        (res) => {
          if (this.props.user.akses === 'ustadz') {
            return (
              this.props.history.push('/artikel')
            );
          }
          return (
            this.props.history.push('/artikel')
          );
        },
        (err) => this.setState({ errors: err.response, isLoading: false })
        // (err) => console.log(err.response)
      );
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }
  render() {
    const { errors, identifier, password, isLoading } = this.state;

    return (
      // <div className="col-md-6 mb-r pb-5">
      <div className="card">
        <div className="card-body">
          {/* Header*/}
          <div className="form-header default-color">
            <h3><i className="fa fa-lock" /> Login:</h3>
          </div>

          { errors.data && <div className="alert alert-danger">{errors.data}</div> }
          {/* Body*/}
          <form onSubmit={this.onSubmit}>

            <TextFieldGroup
              id='email'
              field="identifier"
              label="Email"
              value={identifier}
              error={errors.identifier}
              onChange={this.onChange}
              icon="fa fa-envelope prefix grey-text"
            />

            <TextFieldGroup
              id='password'
              field="password"
              label="Password"
              value={password}
              error={errors.password}
              onChange={this.onChange}
              type="password"
              icon="fa fa-lock prefix grey-text"
            />
            <div className="text-center">
              <button className="btn btn-default waves-effect waves-light" disabled={isLoading}>Login</button>
            </div>
          </form>
        </div>
      </div>

      // <form onSubmit={this.onSubmit}>
      //   <h1>Login</h1>

      //   { errors.data && <div className="alert alert-danger">{errors.data}</div> }

      //   <TextFieldGroup
      //     field="identifier"
      //     label="Email"
      //     value={identifier}
      //     error={errors.identifier}
      //     onChange={this.onChange}
      //   />

      //   <TextFieldGroup
      //     field="password"
      //     label="Password"
      //     value={password}
      //     error={errors.password}
      //     onChange={this.onChange}
      //     type="password"
      //   />

      //   <div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button></div>
      // </form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

export default withRouter(connect(mapStateToProps, { login })(LoginForm));
