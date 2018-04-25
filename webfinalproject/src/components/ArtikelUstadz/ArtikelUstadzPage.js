import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
import ArtikelUstadzList from './ArtikelUstadzList';
import './styleArtikelUstadz.css';
import { createArtikel, fetchArtikels, deleteArtikel, limitArtikel, getCountArtikel } from '../../actions/artikel';

class ArtikelUstadzPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      errors: '',
      editMode: {},
      title: '',
      limit: 0,
    };
  }

  async componentDidMount() {
    await this.props.fetchArtikels(this.props.match.params.username);
    await this.props.getCountArtikel(this.props.match.params.username);
    window.scrollTo(0, 0);
  }
  handleEditorChange = (e) => {
    this.setState({ content: e.target.getContent() });
  }
  limitArtikell = () => {
    console.log('hai');
    this.props.limitArtikel(this.state.limit - this.props.jumlahDelete, this.props.match.params.username);
    this.setState({ limit: this.state.limit + 4 });
  }
  
  render() {
    let akses;

    if (localStorage.getItem('jwtToken') == null) {
      akses = {
        akses: 'tidak ada',
        username: 'tidak ada',
      };
    } else {
      akses = jwtDecode(localStorage.getItem('jwtToken')); 
    }
    // console.log(this.props.jumlahDelete, 'jumlah delete');
    // console.log(this.props.countArtikel, 'jumlah data');
    // console.log(this.props.artikels.length, 'jumlah state');
    let loadMore;
    if (this.props.countArtikel === this.props.artikels.length) {
      console.log('asnteu');
      // loadMore = (
      //   <div>test</div>
      // );
    } else {
      loadMore = (
        <div 
          style={{
            marginRight: '8%',
            marginLeft: '8%',
          }}
          className="row"
        >

          <div className="col-4" />
          <div className="col-4">
            <button type="button" onClick={this.limitArtikell} className="btn btn-default">Load More</button>
          </div> 
          <div className="col-4" />

        </div>
      );
    }

    let loadArtikel;
    if (this.props.artikels.length === 0) {
      loadArtikel = (<div>Belum ada artikel</div>);
    } else {
      loadArtikel = (
        <div
          className="row" 
          style={{
            marginRight: '8%',
            marginLeft: '8%',
          }}
        >

          {
            this.props.artikels.map(artikel => {
              console.log(artikel, 'data di');
              if (artikel === null) {
                return <div>Belum Data Artikel</div>;
              } 
              return (
                <ArtikelUstadzList
                  paramsUstadz={this.props.match.params.username} 
                  artikel={artikel} 
                  key={artikel._id}
                  modeEdit={this.modeEdit}
                  deleteArtikel={this.props.deleteArtikel}
                />
              );
            }
            )
          }
          
        </div>
      );
    }
    return (
      <div>
        <div className="row">
        
          <div className="col-4" />
          <div className="col-4">

            <div>

              { 
                akses.akses === 'ustadz' && akses.username === this.props.match.params.username ? 
                  <Link
                    to={`/${this.props.match.params.username}/artikel/add`}
                    className="btn teal btn-lg btn-block"
                  >Tambah Artikel</Link>
                  : 
                  ''
              }
              
            </div>
          </div>
          <div className="col-4" />
        </div>
        {loadArtikel}
        {loadMore}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    artikels: state.artikels.data,
    jumlahDelete: state.artikels.jumlahDelete,
    countArtikel: state.countArtikel.data.data,
  };
}

export default connect(mapStateToProps, {
  createArtikel,
  fetchArtikels,
  deleteArtikel,
  limitArtikel,
  getCountArtikel,
})(ArtikelUstadzPage);

