import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linkActive: window.location.pathname,
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
        <li className="nav-item"> <a href="javascript" onClick={this.logout} className="nav-link waves-effect waves-light" >Logout</a> </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto nav-flex-icons">
        <li className="nav-item"> <Link to="/signup" className="nav-link waves-effect waves-light" >Sign up</Link> </li>
        <li className="nav-item"> <Link to="/login" className="nav-link waves-effect waves-light" >Login</Link> </li>
      </ul>
      
    );

    return (
      <nav className="mb-1 navbar navbar-expand-lg fixed-top navbar-dark teal darken-2 ">
        <Link to="/" className="navbar-brand">Mari Dakwah</Link>
        <button
          className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav" aria-controls="basicExampleNav"
          aria-expanded="false" aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent-3">
          <ul className="navbar-nav mr-auto">
            <li className={this.state.linkActive === '/artikel' ? 'nav-item active' : 'nav-item'}>
              <Link replace to="/artikel" onClick={() => this.activeLink('/artikel')} className="nav-link waves-effect waves-light"> Artikel </Link>
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
          </ul>
          { isAuthenticated ? userLinks : guestLinks }
        </div>
      </nav>
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
