import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import { withRouter } from 'react-router-dom';
import SweetAlert from 'sweetalert-react';
import '../../../node_modules/sweetalert/dist/sweetalert.css';
// import auth from '../../reducers/auth';

class TentangUstadzList extends Component {
  state = {
    show: false,
    modeEdit: 'none',
    modeSave: true,
    pendidikan: this.props.pendid ? this.props.pendid : '',
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleMode = (e) => {
    this.setState({ modeEdit: true, modeSave: 'none' });
  }

  handleDelete = (e) => {
    this.props.deletePendidikan(this.props.nomor - 1);
    this.setState({ show: false });
  }
  handleSave = (e) => {
    this.setState({ modeEdit: 'none', modeSave: true });
    this.props.updatePendidikan(this.props.nomor - 1, this.pendidikanInput.value);
    console.log(this.pendidikanInput.value);
  }
  render() {
    // const { author } = artikel.author;
    // const linkAudio = `http://localhost:3000/audios/${audio.audio}`;
    // const linkCover = 'https://brightplanet.com/wp-content/uploads/2016/04/play-1073616_1280-1030x1030.png';

    let akses;
    // const urlEdit = `/${this.props.paramsUstadz}/jadwal/edit/${jadwal._id}`;

    if (localStorage.getItem('jwtToken') == null) {
      akses = {
        akses: 'tidak ada',
        username: 'tidak ada',
      };
    } else {
      akses = jwtDecode(localStorage.getItem('jwtToken')); 
    }
    const { pendid, nomor } = this.props;
    return (

      <ul className="list-group list-group-flush">
                            
        <li className="list-group-item">
          <div
            style={{
              display: this.state.modeSave,
            }}
            className="row"
          >
            <div className="col-9">
              {pendid}
            </div>
            { 
              akses.akses === 'ustadz' && akses.username === this.props.match.params.username ? 
                
                <button
                  onClick={this.handleMode}
                  style={{
                    display: this.state.modeSave,
                  }}
                  className="btn waves-effect waves-light teal btn-sm"
                >
                                Edit
                </button>
                                  
                : 
                ''
            }
            { 
              akses.akses === 'ustadz' && akses.username === this.props.match.params.username ? 
                
                <button
                  onClick={() => this.setState({ show: true })}
                  // onClick={this.handleMode}
                  style={{
                    display: this.state.modeSave,
                  }}
                  className="btn waves-effect waves-light red btn-sm"
                >
                                Delete
                </button>
                                  
                : 
                ''
            }
            <SweetAlert
              show={this.state.show}
              title="Peringatan!"
              text="Apakah anda yakin menghapus nya?"
              onConfirm={this.handleDelete}
              onCancel={() => this.setState({ show: false })}
              showCancelButton
            />
          </div>
          <div className="row">
            <div
              style={{
                display: this.state.modeEdit,
              }}
              className="md-form col-9"
            >
              {/* {nomor} */}
              <input 
                required
                style={{
                  width: '100%',
                }}
                type="text"
                id={nomor}
                ref={pendidikanInput => (this.pendidikanInput = pendidikanInput)}
                // className="form-control"
                onChange={this.handleChange}
                value={this.state.pendidikan}
                // defaultValue={this.state.pekerjaan}
                name="pendidikan"
              />
              {/* <label htmlFor={nomor}>Judul Artikel</label> */}
            </div>
            <button
              style={{ display: this.state.modeEdit }}
              className="btn waves-effect waves-light teal btn-sm"
              onChange={this.handleChange}
              onClick={this.handleSave}
            >
                                Save
            </button>
          </div>
          
        </li>
      </ul>
    );
  }
}

export default withRouter(TentangUstadzList);
