import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import './styleNavigationBar2.css';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linkActive: '',
    };
    this.logout = this.logout.bind(this);
  }
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }
  activeLink = (input) => {
    this.setState({ linkActive: input });
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <ul className="navbar-nav ml-auto nav-flex-icons">
        <li className="nav-item"> <a href="#" onClick={this.logout} className="nav-link waves-effect waves-light" >Logout</a> </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto nav-flex-icons">
        <li className="nav-item"> <Link to="/signup" className="nav-link waves-effect waves-light" >Sign up</Link> </li>
        <li className="nav-item"> <Link to="/login" className="nav-link waves-effect waves-light" >Login</Link> </li>
      </ul>
      
    );

    return (
      <div>
        <div
          style={{
            width: '100%',
            marginTop: '-25px',
            height: '75px',
            background: '#1da1f2',
            marginBottom: '-25px',
          }}
          className="sticky"
        />

        <nav
          className="nsticky mb-1 navbar navbar-expand-lg navbar-dark default-color"
        >
          <Link to="/" className="navbar-brand">Red Dice</Link>
          <button
            className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav" aria-controls="basicExampleNav"
            aria-expanded="false" aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent-3">
            <ul className="navbar-nav mr-auto">
              <li className={this.state.linkActive === '/artikel' ? 'nav-item active' : 'nav-item'}>
                <Link to="/artikel" onClick={() => this.activeLink('/artikel')} className="nav-link waves-effect waves-light"> Artikel </Link>
              </li>
              <li className={this.state.linkActive === '/video' ? 'nav-item active' : 'nav-item'}>
                <Link to="/video" onClick={() => this.activeLink('/video')} className="nav-link waves-effect waves-light"> Video </Link>
              </li>
              <li className={this.state.linkActive === '/audio' ? 'nav-item active' : 'nav-item'}>
                <Link to="/audio" onClick={() => this.activeLink('/audio')} className="nav-link waves-effect waves-light"> Audio </Link>
              </li>
              <li className={this.state.linkActive === '/jadwal' ? 'nav-item active' : 'nav-item'}>
                <Link to="/jadwal" onClick={() => this.activeLink('/jadwal')} className="nav-link waves-effect waves-light"> Jadwal Kegiatan </Link>
              </li>
              <li className={this.state.linkActive === '/ustadz' ? 'nav-item active' : 'nav-item'}>
                <Link to="/ustadz" onClick={() => this.activeLink('/ustadz')} className="nav-link waves-effect waves-light"> List Ustadz </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                >Dropdown</a>
                <div className="dropdown-menu dropdown-default" aria-labelledby="navbarDropdownMenuLink-3">
                  <a className="dropdown-item waves-effect waves-light" href="#">Action</a>
                  <a className="dropdown-item waves-effect waves-light" href="#">Another action</a>
                  <a className="dropdown-item waves-effect waves-light" href="#">Something else here</a>
                </div>
              </li>
            </ul>
          
            { isAuthenticated ? userLinks : guestLinks }
          </div>
        </nav>
      </div>
      
    );
  }
}

// NavigationBar.propTypes = {
//   auth: PropTypes.object.isRequired,
//   logout: PropTypes.func.isRequired,
// };

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
