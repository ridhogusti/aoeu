import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import { Link, withRouter } from 'react-router-dom';
import SweetAlert from 'sweetalert-react';
import '../../../node_modules/sweetalert/dist/sweetalert.css';
// import auth from '../../reducers/auth';

class AudioUstadzList extends Component {
  state = {
    show: '',
  }

  delAudio = id => {
    this.props.deleteAudio(id);
    this.setState({ show: false });
  }
  render() {
    const { audio } = this.props;
    // const { author } = artikel.author;
    const linkAudio = `http://maridakwah.com:3000/audios/${audio.audio}`;
    // const linkCover = 'https://brightplanet.com/wp-content/uploads/2016/04/play-1073616_1280-1030x1030.png';

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
      <div
        style={{
          marginBottom: '1%',
          marginRight: '1%',
          width: '48%',
          // height: '180px',
        }}
        className="card"
      >
        <div className="row">
          <div className="col-5">
            <div className="view overlay rounded z-depth-2">
              <img
                alt="his"
                src="https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg" className="img-fluid"
              />
              <a>
                <div className="mask waves-effect waves-light" />
              </a>
            </div>
          </div>
          <div
            style={{
              marginTop: '6px',
            }}
            className="col-6"
          >
            <h7 className="mb-4 font-weight-bold dark-grey-text">
              <strong>{audio.title}</strong>
            </h7>
            <p>
            Pembicara : 
              <strong>{audio.author.name}</strong>
              <br />
            Tanggal : 
              <strong>{audio.updatedAt}</strong>
            </p>
            <p />

            <audio controls>
              <source src={linkAudio} type="audio/mp3" />
Your browser does not support the audio element.
            </audio>
          </div>
        </div>
        { 
          akses.akses === 'ustadz' && akses.username === this.props.paramsUstadz ? 
            <div className="row justify-content-center">
              {/* <button type="button" onClick={() => this.props.modeEdit(video)} className="btn btn-info btn-rounded">Ubah</button> */}
              <Link
                to={{
                  pathname: `/${this.props.paramsUstadz}/audio/edit/${audio._id}`,
                }}
                // to={'/aoeu/artikel'}
                className="btn btn-info btn-rounded"
              >Ubah</Link>

              <button type="button" onClick={() => this.setState({ show: true })} className="btn btn-danger btn-rounded">Hapus</button>

              <SweetAlert
                show={this.state.show}
                title="Peringatan!"
                text="Apakah anda yakin menghapus nya?"
                onConfirm={() => this.delAudio(audio._id)}
                onCancel={() => this.setState({ show: false })}
                showCancelButton
              />
            </div>
            :
            '' 
        }
      </div>     
    );
  }
}

export default withRouter(AudioUstadzList);
