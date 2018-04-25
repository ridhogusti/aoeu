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
    // console.log(this.props.namaUstadz, 'dari navbar');
    // this.props.fetchArtikels(this.props.namaUstadz);
  }
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }
  activeLink = (input) => {
    this.setState({ linkActive: input });
  }

  render() {
    const urlUstadzTanya = `/${this.props.namaUstadz}/tanya`;
    const { isAuthenticated } = this.props.auth;
    // console.log(this.props.artikels.length);

    const userLinks = (
      <ul className="navbar-nav ml-auto nav-flex-icons">
        {/* <li className="nav-item"> <Link to="/namaustadz/tanyajawab" className="nav-link waves-effect waves-light" >Tanya & Jawab</Link> </li> */}
        <li className={this.state.linkActive === `/${this.props.namaUstadz}/tanya` ? 'nav-item active' : 'nav-item'}>
          <Link to={urlUstadzTanya} onClick={() => this.activeLink(urlUstadzTanya)} className="nav-link waves-effect waves-light"> Tanya & Jawab </Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto nav-flex-icons" />
      
    );

    const urlUstadz = `/${this.props.namaUstadz}/artikel`;
    const urlUstadzVideo = `/${this.props.namaUstadz}/video`;
    const urlUstadzAudio = `/${this.props.namaUstadz}/audio`;
    const urlUstadzJadwal = `/${this.props.namaUstadz}/jadwal`;
    const urlUstadzTentang = `/${this.props.namaUstadz}/tentang`;

    return (
      <div>
        {/* Avatar*/}
        <div
          className="row"
        >
          <div
            style={{
              position: 'fixed',
              zIndex: '3',
            }}
            className="col-12"
          >
            <div
              style={{
                // width: '100%',
                marginTop: '-25px',
                height: '100px',
                background: '#009688',
              }}
              className="text-center"
            >
              <br />
              <h1
                style={{
                  color: '#fff',
                }}
              >
                {this.props.namaUstadz}
              </h1>
            </div>
          </div>
        
          {/* <div className="col-3">
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
          </div> */}

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
              <ul className="mr-auto" /> <ul className="mr-auto" /> <ul className="mr-auto" /> <ul className="mr-auto" /> <ul className="mr-auto" />
              <ul className="mr-auto" /> <ul className="mr-auto" /> 
              <div className="collapse navbar-collapse" id="navbarSupportedContent-3">
                <ul className=" mr-auto" />
                <ul className="navbar-nav mr-auto">
                  <li className={this.state.linkActive === `/${this.props.namaUstadz}/artikel` ? 'nav-item active' : 'nav-item'}>
                    <Link 
                      to={urlUstadz} 
                      onClick={() => this.activeLink(urlUstadz)} className="nav-link text-center waves-effect waves-light"
                    > Artikel 
                    </Link>
                  </li>
                  <li className={this.state.linkActive === `/${this.props.namaUstadz}/video` ? 'nav-item active' : 'nav-item'}>
                    <Link to={urlUstadzVideo} onClick={() => this.activeLink(urlUstadzVideo)} className="nav-link waves-effect waves-light"> Video </Link>
                  </li>
                  <li className={this.state.linkActive === `/${this.props.namaUstadz}/audio` ? 'nav-item active' : 'nav-item'}>
                    <Link to={urlUstadzAudio} onClick={() => this.activeLink(urlUstadzAudio)} className="nav-link waves-effect waves-light"> Audio </Link>
                  </li>
                  <li className={this.state.linkActive === `/${this.props.namaUstadz}/jadwal` ? 'nav-item active' : 'nav-item'}>
                    <Link to={urlUstadzJadwal} onClick={() => this.activeLink(urlUstadzJadwal)} className="nav-link waves-effect waves-light" > Jadwal Kegiatan </Link>
                  </li>
                  <li className={this.state.linkActive === `/${this.props.namaUstadz}/tentang` ? 'nav-item active' : 'nav-item'}>
                    {/* <Link to={urlUstadzTentang} onClick={() => this.activeLink(urlUstadzTentang)} className="nav-link waves-effect waves-light"> Tentang </Link> */}
                    <a href={urlUstadzTentang} onClick={() => this.activeLink(urlUstadzTentang)} className="nav-link waves-effect waves-light">Tentang</a>
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
