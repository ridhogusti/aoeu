import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import JadwalUstadzList from './JadwalUstadzList';
import './styleArtikelUstadz.css';
import { createJadwal, fetchJadwals, deleteJadwal, limitJadwal } from '../../actions/jadwal';

class JadwalUstadzPage extends Component {
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

  componentDidMount() {
    this.props.fetchJadwals(this.props.match.params.username);
    window.scrollTo(0, 0);
  }
  handleEditorChange = (e) => {
    this.setState({ content: e.target.getContent() });
  }
  limitArtikell = () => {
    console.log('hai');
    this.props.limitJadwal(this.state.limit, this.props.match.params.username);
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
    
    return (
      <div>
        <div className="row">
        
          <div className="col-4" />
          <div className="col-4">

            <div>

              { 
                akses.akses === 'ustadz' && akses.username === this.props.match.params.username ? 
                  <a
                    href={`/${this.props.match.params.username}/jadwal/add`}
                    className="btn teal btn-lg btn-block"
                  >Tambah Jadwal</a>
                  // <Link
                  //   to={`/${this.props.match.params.username}/jadwal/add`}
                  //   className="btn teal btn-lg btn-block"
                  // >Tambah Jadwal</Link>
                  : 
                  ''
              }
              
            </div>
          </div>
          <div className="col-4" />
        </div>
        <br />
        <div
          className="row" 

          style={{
            marginRight: '8%',
            marginLeft: '8%',
          }}
        >
          <div className="col-12">
            
            {/* Top Table UI*/}
            <div className="card card-cascade narrower">
              {/* Card image*/}
              <div className="view gradient-card-header blue-gradient narrower py-2 mx-4 mb-3 d-flex justify-content-between align-items-center">
                <div />
                <a href className="white-text mx-3">Jadwal Kegiatan</a>
                <div />
              </div>
              {/* /Card image*/}
              <div className="px-4">
                <div className="table-wrapper">
                  {/* Table*/}
                  <table className="table table-hover mb-0">
                    {/* Table head*/}
                    <thead>
                      <tr>
                        {/* <th>
                          <input type="checkbox" id="checkbox" />
                          <label htmlFor="checkbox" className="mr-2 label-table" />
                        </th> */}
                        <th className="th-lg">#</th>
                        <th className="th-lg">Tanggal</th>
                        <th className="th-lg">Waktu</th>
                        <th className="th-lg">Ustadz</th>
                        <th className="th-lg">Tema Kajian</th>
                        <th className="th-lg">Tempat</th>
                      </tr>
                    </thead>
                    {/* Table head*/}
                    {/* Table body*/}
                    <tbody>
                      {
                        this.props.jadwals.map((jadwal, i) => (<JadwalUstadzList
                          paramsUstadz={this.props.match.params.username} 
                          jadwal={jadwal} 
                          key={jadwal._id}
                          nomor={i}
                          modeEdit={this.modeEdit}
                          deleteJadwal={this.props.deleteJadwal}
                        />))
                      }
                    </tbody>
                    {/* Table body*/}
                  </table>
                  {/* Table*/}
                </div>
                <hr className="my-0" />
              </div>
            </div>
          </div>
          
        </div>
        <div 
          style={{
            marginRight: '8%',
            marginLeft: '8%',
          }}
          className="row"
        >

          <div className="col-4" />
          <div className="col-4 text-center">
            <button type="button" onClick={this.limitArtikell} className="btn btn-default">Load More</button>
          </div> 
          <div className="col-4" />

        </div>
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    jadwals: state.jadwals.data,
  };
}

export default connect(mapStateToProps, {
  createJadwal,
  fetchJadwals,
  deleteJadwal,
  limitJadwal,
})(JadwalUstadzPage);

