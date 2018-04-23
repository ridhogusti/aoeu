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

  delJadwal = id => {
    this.props.deleteJadwal(id);
    this.setState({ show: false });
  }
  render() {
    const { jadwal, nomor } = this.props;
    // const { author } = artikel.author;
    // const linkAudio = `http://localhost:3000/audios/${audio.audio}`;
    // const linkCover = 'https://brightplanet.com/wp-content/uploads/2016/04/play-1073616_1280-1030x1030.png';

    let akses;
    const urlEdit = `/${this.props.paramsUstadz}/jadwal/edit/${jadwal._id}`;

    if (localStorage.getItem('jwtToken') == null) {
      akses = {
        akses: 'tidak ada',
        username: 'tidak ada',
      };
    } else {
      akses = jwtDecode(localStorage.getItem('jwtToken')); 
    }
    return (
      <tr>
        <td>{nomor + 1}</td>
        <td>{jadwal.tanggal}</td>
        <td>{jadwal.waktu} - selesai</td>
        <td>{jadwal.author.name}</td>
        <td>{jadwal.tema}</td>
        <td>{jadwal.tempat}</td>
        <td>
          { 
            akses.akses === 'ustadz' && akses.username === this.props.paramsUstadz ? 
              <div className="row ">
                {/* <button type="button" onClick={() => this.props.modeEdit(video)} className="btn btn-info btn-rounded">Ubah</button> */}
                <a
                  href={urlEdit}
                  className="btn btn-info btn-rounded justify-content-center"
                >Ubah</a>
                {/* <Link
                  to={{
                    pathname: `/${this.props.paramsUstadz}/audio/edit/${jadwal._id}`,
                  }}
                  // to={'/aoeu/artikel'}
                  className="btn btn-info btn-rounded"
                >Ubah</Link> */}

                <button type="button" onClick={() => this.setState({ show: true })} className="btn btn-danger btn-rounded">Hapus</button>

                <SweetAlert
                  show={this.state.show}
                  title="Peringatan!"
                  text="Apakah anda yakin menghapus nya?"
                  onConfirm={() => this.delJadwal(jadwal._id)}
                  onCancel={() => this.setState({ show: false })}
                  showCancelButton
                />
              </div>
              :
              '' 
          }
        </td>
      </tr>      
    );
  }
}

export default withRouter(AudioUstadzList);
