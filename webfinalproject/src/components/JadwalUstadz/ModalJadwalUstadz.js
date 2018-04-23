import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { fetchJadwal, createJadwal, updateJadwal } from '../../actions/jadwal';
import JadwalForm from './JadwalForm';

class ModalJadwalUstadz extends Component {
  state = {
    errors: '',
  }
  // constructor(props) {
  //   super(props);
  //   const { match } = this.props;
  //   this.props.fetchArtikel(match.params.id);
  //   this.state = { 
  //     // title: 'aoe',
  //     title: this.props.editartikel.title !== null ? this.props.editartikel.title : 'aoeunh',
  //     // text: this.props.editartikel.length === 1 ? this.props.editartikel.title : 'aoeunh',
  //     // image: this.props.editartikel.length === 1 ? this.props.editartikel.title : 'aoeunh',
  //   };
  // }
  componentDidMount = () => {
    window.scrollTo(0, 0);
    const { match } = this.props;

    if (match.params.id) {
      this.props.fetchJadwal(match.params.id);
    }
  }

  // componentWillMount() {
  //   const { match } = this.props;
  //   // if (match.params.id) {
  //   this.props.fetchArtikel(match.params.id);
  //   //   console.log('aeosu');
  //   // }
  // }
  handleChange = (e) => {
    this.setState({
      // [e.target.name]: e.target.value,
      title: e.target.value,
    });
  }
  
  saveJadwal = (args) => {
    console.log(args, 'params');
    const akses = jwtDecode(localStorage.getItem('jwtToken')); 
    if (args._id) {
      const fd = new FormData();
      fd.append('_id', args._id);
      fd.append('tanggal', args.tanggal);
      fd.append('waktu', args.waktu);
      fd.append('tema', args.tema);
      fd.append('tempat', args.tempat);
      this.props.updateJadwal(fd).then(
        // (res) => this.props.history.push('/'),
        (res) => this.props.history.push(`/${akses.username}/jadwal`),
        // (res) => console.log(res, 'hasi res'),
        (err) => this.setState({ errors: err.response })
      );
    } else {
      const fd = new FormData();
      console.log(args);
      fd.append('tanggal', args.tanggal);
      fd.append('waktu', args.waktu);
      fd.append('tema', args.tema);
      fd.append('tempat', args.tempat);
      this.props.createJadwal(fd).then(
        (res) => this.props.history.push(`/${akses.username}/jadwal`),
        // (res) => <Redirect to="/games" />,
        // (err) => this.setState({ errors: err })
        (err) => this.setState({ errors: err.response })
      );
    }
  }
  render() {
    return (
      <div>
        {this.state.errors}
        <JadwalForm errorss={this.state.errors} saveJadwal={this.saveJadwal} editjadwal={this.props.editjadwal} />
      </div>
    );
  }
}
function mapStateToProps(state, props) {
  const { match } = props;
  if (match.params.id) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      editjadwal: state.editjadwal,
    };
  }
  return {
    isAuthenticated: state.auth.isAuthenticated,
    editjadwal: {
      _id: null,
    },
  };
}
export default withRouter(connect(mapStateToProps, {
  fetchJadwal,
  createJadwal,
  updateJadwal,
})(ModalJadwalUstadz));
