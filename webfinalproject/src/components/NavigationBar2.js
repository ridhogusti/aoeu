import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import { fetchArtikels } from '../actions/artikel';
import './styleNavigationBar2.css';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linkActive: window.location.pathname,
    };
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    this.props.fetchArtikels('adihidayat');
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
    console.log(this.props.artikels.length);

    const userLinks = (
      <ul className="navbar-nav ml-auto nav-flex-icons">
        <li className="nav-item"> <Link to="/namaustadz/tanyajawab" className="nav-link waves-effect waves-light" >Tanya & Jawab</Link> </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto nav-flex-icons" />
      
    );

    return (
      <div>
        <div
          style={{
            width: '100%',
            marginTop: '-25px',
            height: '100px',
            background: '#009688',
            position: 'fixed',
            zIndex: '3',
          }}
        />
        {/* Avatar*/}
        <div
          className="row"
        >
        
          <div className="col-3">
            <div
              className="col-3"
              style={{
                marginTop: '125px',
                position: 'fixed',
                zIndex: '4',
              }}
            >
              <div className="avatar mx-auto white"><img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(27).jpg" alt="avatar mx-auto white" className="rounded-circle img-fluid" />
              </div>
            </div>
          </div>

          <div
            className="col-12"
            style={{
              marginTop: '75px',
              position: 'fixed',
              zIndex: '3',
            }}
          >
          
            <nav
              className=" mb-1 navbar navbar-expand-lg navbar-dark teal darken-2"
            >
              <button
                className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav" aria-controls="basicExampleNav"
                aria-expanded="false" aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent-3">
                <ul className=" mr-auto" />
                <ul className="navbar-nav mr-auto">
                  <li className={this.state.linkActive === '/namaustadz/artikel' ? 'nav-item active' : 'nav-item'}>
                    <Link 
                      to="/namaustadz/artikel" 
                      onClick={() => this.activeLink('/namaustadz/artikel')} className="nav-link text-center waves-effect waves-light"
                    > Artikel 
                    
                      <br />
                        250

                    </Link>
                  </li>
                  <li className={this.state.linkActive === '/video' ? 'nav-item active' : 'nav-item'}>
                    <Link to="/video" onClick={() => this.activeLink('/video')} className="nav-link waves-effect waves-light"> Video </Link>
                  </li>
                  <li className={this.state.linkActive === '/audio' ? 'nav-item active' : 'nav-item'}>
                    <Link to="/audio" onClick={() => this.activeLink('/audio')} className="nav-link waves-effect waves-light"> Audio </Link>
                  </li>
                  <li className={this.state.linkActive === '/jadwal' ? 'nav-item active' : 'nav-item'}>
                    <Link
                      to="/jadwal" onClick={() => this.activeLink('/jadwal')} 
                      className="nav-link waves-effect waves-light"
                    > Jadwal Kegiatan </Link>
                  </li>
                  <li className={this.state.linkActive === '/ustadz' ? 'nav-item active' : 'nav-item'}>
                    <Link to="/ustadz" onClick={() => this.activeLink('/ustadz')} className="nav-link waves-effect waves-light"> List Ustadz </Link>
                  </li>
                  { isAuthenticated ? userLinks : guestLinks }
                </ul>
                <ul className="mr-auto" />
                <ul className="mr-auto" />
              </div>
            </nav> 
          </div>
        </div>
        
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
    artikels: state.artikels.data,
  };
}

export default connect(mapStateToProps, { logout, fetchArtikels })(NavigationBar);
