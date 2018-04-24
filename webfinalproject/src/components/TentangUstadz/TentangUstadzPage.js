import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
// import JadwalUstadzList from './JadwalUstadzList';
import './styleArtikelUstadz.css';
import { 
  fetchTentang,
  updatePekerjaan,
  updatePendidikan,
  deletePekerjaan,
  deletePendidikan,
  updateTentang,
} from '../../actions/tentang';
import TentangUstadzList from './TentangUstadzList';
import TentangUstadzListt from './TentangUstadzListt';

class TentangUstadzPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      errors: '',
      editMode: {},
      title: '',
      limit: 0,
      modeEdit: 'none',
      modeSave: true,
      pekerjaan: '',
      pendidikan: '',
    };
  }

  componentDidMount() {
    this.props.fetchTentang(this.props.match.params.username);
    window.scrollTo(0, 0);
  }
  
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSavependidikan = () => {
    const data = {
      pendidikan: this.pendidikanInput.value,
    };
    this.props.updateTentang(data);
    this.setState({ pendidikan: '' });
    // console.log(this.pekerjaanInput.value);
  }
  handleSavepekerjaan = () => {
    const data = {
      pekerjaan: this.pekerjaanInput.value,
    };
    this.props.updateTentang(data);
    this.setState({ pekerjaan: '' });
    // console.log(this.pekerjaanInput.value);
  }
  deletePendidikan = (id) => {
    console.log(id, 'dari update pendidikan');
    this.props.deletePendidikan(id);
  }
  deletePekerjaan = (id) => {
    console.log(id, 'dari update pendidikan');
    this.props.deletePekerjaan(id);
  }

  updatePendidikan = (id, data) => {
    console.log(id, 'dari update pendidikan');
    console.log(data, 'dari update pendidikan');
    this.props.updatePendidikan(id, data);
  }
  updatePekerjaan = (id, data) => {
    console.log(id, 'dari update pendidikan');
    console.log(data, 'dari update pendidikan');
    this.props.updatePekerjaan(id, data);
  }

  handleMode = () => {
    this.setState({ modeEdit: true, modeSave: 'none' });
  }
  handleSave = () => {
    const data = {
      telpon: this.telponInput.value ? this.telponInput.value : '',
      alamat: this.alamatInput.value ? this.alamatInput.value : '',
      email: this.emailInput.value ? this.emailInput.value : '',
      tanggallahir: this.tanggalInput.value,
    };
    console.log(data, 'update data');
    this.props.updateTentang(data);
    this.setState({ modeEdit: 'none', modeSave: true });
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

    let { tentang } = this.props;

    console.log(tentang, 'tentang bro');

    if (tentang == null) {
      tentang = 'taoeu';
    }

    return (
      <div>
        {console.log(tentang, 'tentang bawah')}
        {/* Nav tabs */}
        <div className="row">
          <div className="col-md-3">
            <ul className="nav  md-pills pills-primary flex-column" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" data-toggle="tab" href="#panel21" role="tab">Pekerjaan dan Pendidikan
                  <i className="fa fa-download ml-2" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#panel22" role="tab">Info Kontak dan Dasar
                  <i className="fa fa-file-text ml-2" />
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-9">
            {/* Tab panels */}
            <div className="tab-content vertical">
              {/* Panel 1*/}
              
              <div className="tab-pane fade in show active" id="panel21" role="tabpanel">
                <h5 className="my-2 h5">Pekerjaan</h5>
                { 
                  akses.akses === 'ustadz' && akses.username === this.props.match.params.username ? 
                    <div className="row">
                  
                      <div
                        className="md-form col-9"
                      >
                        {/* {nomor} */}
                        <input 
                          style={{
                            width: '100%',
                          }}
                          required
                          type="text"
                          // id="pekerjaan"
                          ref={pekerjaanInput => (this.pekerjaanInput = pekerjaanInput)}
                          // className="form-control"
                          // onChange={this.handleChange}
                          placeholder="Tambah Pekerjaan"
                          // value={this.state.pekerjaan}
                          defaultValue={this.state.pekerjaan}
                          // name="pekerjaan"
                        />
                        {/* <label htmlFor={nomor}>Judul Artikel</label> */}
                      </div>
                      <button
                        className="btn waves-effect waves-light teal btn-sm"
                        onChange={this.handleChange}
                        onClick={this.handleSavepekerjaan}
                      >
                                Save
                      </button>
                    </div>
                                  
                    : 
                    ''
                }
                {
                  tentang.map((value, i) => {
                    if (value == null) {
                      return <p>balue</p>;
                    } 
                      
                    const pekerjaann = value.pekerjaan;
                    let nomor = pekerjaann.length + 1;
                    return (
                      <div>
                        {
                          pekerjaann.reverse().map(pekerjaan => {
                            nomor--;
                            return (
                              <TentangUstadzList deletePekerjaan={this.deletePekerjaan} updatePekerjaan={this.updatePekerjaan} nomor={nomor} peker={pekerjaan} key={nomor} />
                            );
                          })
                        }
                      </div>
                    );
                  })
                }
                
                <h5 className="my-2 h5">Pendidikan</h5>
                { 
                  akses.akses === 'ustadz' && akses.username === this.props.match.params.username ? 
                    <div className="row">
                  
                      <div
                        className="md-form col-9"
                      >
                        {/* {nomor} */}
                        <input 
                          style={{
                            width: '100%',
                          }}
                          required
                          type="text"
                          // id="pekerjaan"
                          ref={pendidikanInput => (this.pendidikanInput = pendidikanInput)}
                          // className="form-control"
                          // onChange={this.handleChange}
                          placeholder="Tambah Pendidikan"
                          // value={this.state.pekerjaan}
                          defaultValue={this.state.pendidikan}
                          // name="pekerjaan"
                        />
                        {/* <label htmlFor={nomor}>Judul Artikel</label> */}
                      </div>
                      <button
                        className="btn waves-effect waves-light teal btn-sm"
                        onChange={this.handleChange}
                        onClick={this.handleSavependidikan}
                      >
                                Save
                      </button>
                    </div>
                                  
                    : 
                    ''
                }
                {
                  tentang.map(value => {
                    if (value == null) {
                      return <p>teasu</p>;
                    }
                    const pendidikan = value.pendidikan;
                    let nomor = pendidikan.length + 1;
                    return (
                      <div>

                        {pendidikan.reverse().map(pendid => {
                          nomor--;
                          return (
                            <TentangUstadzListt deletePendidikan={this.deletePendidikan} updatePendidikan={this.updatePendidikan} nomor={nomor} pendid={pendid} key={nomor} />
                          );
                          // (<ul className="list-group list-group-flush">
                          //   <li className="list-group-item">{pendid}</li>
                          // </ul>) 
                        })}
                      </div>
                    );
                  })
                }

              </div>
              {/* /.Panel 1*/}
              {/* Panel 2*/}

              {
                tentang.map(value => {
                  if (value == null) {
                    return (
                      <div className="tab-pane fade" id="panel22" role="tabpanel">
                        <h5 className="my-2 h5">Informasi Kontak
                          { 
                            akses.akses === 'ustadz' && akses.username === this.props.match.params.username ? 
              
                              <button
                                onClick={this.handleMode}
                                style={{ display: this.state.modeSave }}
                                className="btn waves-effect waves-light teal btn-sm"
                              > Edit
                              </button>
                                
                              : 
                              ''
                          }
                          <button
                            style={{ display: this.state.modeEdit }}
                            className="btn waves-effect waves-light teal btn-sm"
                            onChange={this.handleChange}
                            onClick={this.handleSave}
                          >
                              Save
                          </button>
                        </h5>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">
                            <div className="row" style={{ display: this.state.modeSave }} >
                              <div className="col-9">
                    Telepon Seluler : 
                              </div>
                        
                            </div>
                            <div className="row">
                              <div style={{ display: this.state.modeEdit }} className="md-form col-9" >
                                {/* {nomor} */}
                                <div className="row">
                                  <div className="col-3">
                              Telepon Seluler : 
                                  </div>
                                  <div className="col-9">
                                    <input
                                      style={{ width: '100%' }}
                                      required
                                      type="text"
                                      ref={telponInput => (this.telponInput = telponInput)}
                                      // className="form-control"
                                      onChange={this.handleChange}
                                      defaultValue=""
                                      // value={value ? value.telpon : ''}
                                      // defaultValue={this.state.pekerjaan}
                                      name="telpon"
                                    />
                                    {/* <label htmlFor={nomor}>Judul Artikel</label> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="list-group-item">
                            <div className="row" style={{ display: this.state.modeSave }} >
                              <div className="col-9">
                    Alamat : 
                              </div>
                        
                            </div>
                            <div className="row">
                              <div style={{ display: this.state.modeEdit }} className="md-form col-9" >
                                {/* {nomor} */}
                                <div className="row">
                                  <div className="col-3">
                              Alamat : 
                                  </div>
                                  <div className="col-9">
                                    <input
                                      style={{ width: '100%' }}
                                      required
                                      type="text"
                                      ref={alamatInput => (this.alamatInput = alamatInput)}
                                      // className="form-control"
                                      onChange={this.handleChange}
                                      defaultValue=""
                                      // defaultValue={this.state.pekerjaan}
                                      name="alamat"
                                    />
                                    {/* <label htmlFor={nomor}>Judul Artikel</label> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="list-group-item">
                            <div className="row" style={{ display: this.state.modeSave }} >
                              <div className="col-9">
                    Email : 
                              </div>
                        
                            </div>
                            <div className="row">
                              <div style={{ display: this.state.modeEdit }} className="md-form col-9" >
                                {/* {nomor} */}
                                <div className="row">
                                  <div className="col-3">
                              Email : 
                                  </div>
                                  <div className="col-9">
                                    <input
                                      style={{ width: '100%' }}
                                      required
                                      type="text"
                                      ref={emailInput => (this.emailInput = emailInput)}
                                      // className="form-control"
                                      onChange={this.handleChange}
                                      defaultValue=""
                                      // defaultValue={this.state.pekerjaan}
                                      name="email"
                                    />
                                    {/* <label htmlFor={nomor}>Judul Artikel</label> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>

                        <h5 className="my-2 h5">Informasi Umum</h5>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">
                            <div className="row" style={{ display: this.state.modeSave }} >
                              <div className="col-9">
                    Tanggal Lahir : 
                              </div>
                        
                            </div>
                            <div className="row">
                              <div style={{ display: this.state.modeEdit }} className="md-form col-9" >
                                {/* {nomor} */}
                                <div className="row">
                                  <div className="col-3">
                              Tanggal Lahir : 
                                  </div>
                                  <div className="col-9">
                                    <input
                                      style={{ width: '100%' }}
                                      required
                                      type="date"
                                      ref={tanggalInput => (this.tanggalInput = tanggalInput)}
                                      // className="form-control"
                                      onChange={this.handleChange}
                                      defaultValue=""
                                      // defaultValue={this.state.pekerjaan}
                                      name="email"
                                    />
                                    {/* <label htmlFor={nomor}>Judul Artikel</label> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          {/* <li className="list-group-item">Tanggal Lahir : { value.tanggal }</li> */}
                        </ul>
                      </div>
                    );
                  }
                  return (<div className="tab-pane fade" id="panel22" role="tabpanel">
                    <h5 className="my-2 h5">Informasi Kontak
                      { 
                        akses.akses === 'ustadz' && akses.username === this.props.match.params.username ? 
              
                          <button
                            onClick={this.handleMode}
                            style={{ display: this.state.modeSave }}
                            className="btn waves-effect waves-light teal btn-sm"
                          > Edit
                          </button>
                                
                          : 
                          ''
                      }
                      <button
                        style={{ display: this.state.modeEdit }}
                        className="btn waves-effect waves-light teal btn-sm"
                        onChange={this.handleChange}
                        onClick={this.handleSave}
                      >
                              Save
                      </button>
                    </h5>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <div className="row" style={{ display: this.state.modeSave }} >
                          <div className="col-9">
                    Telepon Seluler : { value.telpon }
                          </div>
                        
                        </div>
                        <div className="row">
                          <div style={{ display: this.state.modeEdit }} className="md-form col-9" >
                            {/* {nomor} */}
                            <div className="row">
                              <div className="col-3">
                              Telepon Seluler : 
                              </div>
                              <div className="col-9">
                                <input
                                  style={{ width: '100%' }}
                                  required
                                  type="text"
                                  ref={telponInput => (this.telponInput = telponInput)}
                                  // className="form-control"
                                  onChange={this.handleChange}
                                  defaultValue={value.telpon}
                                  // value={value.telpon}
                                  // defaultValue={this.state.pekerjaan}
                                  name="telpon"
                                />
                                {/* <label htmlFor={nomor}>Judul Artikel</label> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row" style={{ display: this.state.modeSave }} >
                          <div className="col-9">
                    Alamat : { value.alamat }
                          </div>
                        
                        </div>
                        <div className="row">
                          <div style={{ display: this.state.modeEdit }} className="md-form col-9" >
                            {/* {nomor} */}
                            <div className="row">
                              <div className="col-3">
                              Alamat : 
                              </div>
                              <div className="col-9">
                                <input
                                  style={{ width: '100%' }}
                                  required
                                  type="text"
                                  ref={alamatInput => (this.alamatInput = alamatInput)}
                                  // className="form-control"
                                  onChange={this.handleChange}
                                  defaultValue={value.alamat}
                                  // defaultValue={this.state.pekerjaan}
                                  name="alamat"
                                />
                                {/* <label htmlFor={nomor}>Judul Artikel</label> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row" style={{ display: this.state.modeSave }} >
                          <div className="col-9">
                    Email : { value.author.email }
                          </div>
                        
                        </div>
                        <div className="row">
                          <div style={{ display: this.state.modeEdit }} className="md-form col-9" >
                            {/* {nomor} */}
                            <div className="row">
                              <div className="col-3">
                              Email : 
                              </div>
                              <div className="col-9">
                                <input
                                  style={{ width: '100%' }}
                                  required
                                  type="text"
                                  ref={emailInput => (this.emailInput = emailInput)}
                                  // className="form-control"
                                  onChange={this.handleChange}
                                  defaultValue={value.author.email}
                                  // defaultValue={this.state.pekerjaan}
                                  name="email"
                                />
                                {/* <label htmlFor={nomor}>Judul Artikel</label> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>

                    <h5 className="my-2 h5">Informasi Umum</h5>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <div className="row" style={{ display: this.state.modeSave }} >
                          <div className="col-9">
                    Tanggal Lahir : { value.tanggallahir }
                          </div>
                        
                        </div>
                        <div className="row">
                          <div style={{ display: this.state.modeEdit }} className="md-form col-9" >
                            {/* {nomor} */}
                            <div className="row">
                              <div className="col-3">
                              Tanggal Lahir : 
                              </div>
                              <div className="col-9">
                                <input
                                  style={{ width: '100%' }}
                                  required
                                  type="date"
                                  ref={tanggalInput => (this.tanggalInput = tanggalInput)}
                                  // className="form-control"
                                  onChange={this.handleChange}
                                  defaultValue={value.tanggallahir}
                                  // defaultValue={this.state.pekerjaan}
                                  name="email"
                                />
                                {/* <label htmlFor={nomor}>Judul Artikel</label> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      {/* <li className="list-group-item">Tanggal Lahir : { value.tanggal }</li> */}
                    </ul>
                  </div>);
                }
                  
                )
              }
              {/* /.Panel 2*/}
            </div>
          </div>
        </div>
        {/* Nav tabs */}
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    tentang: state.tentang.data,
  };
}

export default connect(mapStateToProps, {
  fetchTentang,
  updatePekerjaan,
  updatePendidikan,
  deletePekerjaan,
  deletePendidikan,
  updateTentang,
})(TentangUstadzPage);

