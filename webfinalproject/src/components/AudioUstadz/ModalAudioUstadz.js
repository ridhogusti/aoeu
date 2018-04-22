import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { fetchAudio, createAudio, updateAudio } from '../../actions/audio';
import AudioForm from './AudioForm';

class ModalAudioUstadz extends Component {
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
      this.props.fetchAudio(match.params.id);
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
  
  saveAudio = (args) => {
    console.log(args, 'params');
    const akses = jwtDecode(localStorage.getItem('jwtToken')); 
    if (args._id) {
      const fd = new FormData();
      fd.append('_id', args._id);
      fd.append('title', args.title);
      fd.append('audio', args.audio);
      this.props.updateAudio(fd).then(
        // (res) => this.props.history.push('/'),
        (res) => this.props.history.push(`/${akses.username}/audio`),
        // (res) => console.log(res, 'hasi res'),
        (err) => this.setState({ errors: err.response })
      );
    } else {
      const fd = new FormData();
      console.log(args);
      if (args.title != null & args.audio != null) {
        fd.append('title', args.title);
        fd.append('audio', args.audio);
        this.props.createAudio(fd).then(
          (res) => this.props.history.push(`/${akses.username}/audio`),
          // (res) => <Redirect to="/games" />,
          // (err) => this.setState({ errors: err })
          (err) => this.setState({ errors: err.response.data.errors.title })
        );
      }
    }
  }
  render() {
    return (
      <div>
        {this.state.errors}
        <AudioForm errorss={this.state.errors} saveAudio={this.saveAudio} editaudio={this.props.editaudio} />
      </div>
    );
  }
}
function mapStateToProps(state, props) {
  const { match } = props;
  if (match.params.id) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      editaudio: state.editaudio,
    };
  }
  return {
    isAuthenticated: state.auth.isAuthenticated,
    editaudio: {
      _id: null,
    },
  };
}
export default withRouter(connect(mapStateToProps, {
  fetchAudio,
  createAudio,
  updateAudio,
})(ModalAudioUstadz));
