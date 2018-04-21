import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { fetchArtikel, createArtikel, updateArtikel } from '../../actions/artikel';
import ArtikelForm from './ArtikelForm';

class ModalArtikelUstadz extends Component {
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
    const { match } = this.props;

    if (match.params.id) {
      this.props.fetchArtikel(match.params.id);
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
  
  saveArtikel = (args) => {
    console.log(args, 'params');
    const akses = jwtDecode(localStorage.getItem('jwtToken')); 
    if (args._id) {
      const fd = new FormData();
      fd.append('_id', args._id);
      fd.append('title', args.title);
      fd.append('text', args.text);
      fd.append('image', args.image);
      this.props.updateArtikel(fd).then(
        // (res) => this.props.history.push('/'),
        (res) => this.props.history.push(`/${akses.username}/artikel`),
        // (res) => console.log(res, 'hasi res'),
        (err) => this.setState({ errors: err.response })
      );
    } else {
      const fd = new FormData();
      console.log(args);
      if (args.title != null & args.image != null & args.text != null) {
        fd.append('title', args.title);
        fd.append('text', args.text);
        fd.append('image', args.image);
        this.props.createArtikel(fd).then(
          (res) => this.props.history.push(`/${akses.username}/artikel`),
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
        <ArtikelForm errorss={this.state.errors} saveArtikel={this.saveArtikel} editartikel={this.props.editartikel} />
      </div>
    );
  }
}
function mapStateToProps(state, props) {
  const { match } = props;
  if (match.params.id) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      editartikel: state.editartikel,
    };
  }
  return {
    isAuthenticated: state.auth.isAuthenticated,
    editartikel: {
      _id: null,
    },
  };
}
export default withRouter(connect(mapStateToProps, {
  fetchArtikel,
  createArtikel,
  updateArtikel,
})(ModalArtikelUstadz));
