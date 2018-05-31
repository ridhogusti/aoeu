import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import { Link, withRouter } from 'react-router-dom';
import SweetAlert from 'sweetalert-react';
import '../../../node_modules/sweetalert/dist/sweetalert.css';
// import auth from '../../reducers/auth';

class ArtikelUstadzList extends Component {
  state = {
    show: '',
  }

  delArtikel = id => {
    this.props.deleteArtikel(id);
    this.setState({ show: false });
  }
  render() {
    const { artikel } = this.props;
    // const { author } = artikel.author;
    const linkImage = `http://maridakwah.com:3000/images/${artikel.image}`;

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
          marginTop: 40,
        }}
        className="col-3"
      >
        <div className="card">
          <div className="view overlay">
            <img
              alt={linkImage}
              className="card-img-top" src={linkImage}
            />
            <a>
              <div className="mask rgba-white-slight waves-effect waves-light" />
            </a>
          </div>
          <Link
            to={{
              pathname: `/artikel/detail/${artikel._id}`,
              state: { artikel },
            }}
            className="btn-floating btn-action ml-auto mr-4 mdb-color lighten-3 waves-effect waves-light"
          >
            <i className="fa fa-chevron-right pl-1" />
          </Link>
          {/* <a className="btn-floating btn-action ml-auto mr-4 mdb-color lighten-3 waves-effect waves-light">
            <i className="fa fa-chevron-right pl-1" />
          </a> */}

          <div className="card-body">
            <h4 className="card-title">{artikel.title}</h4>
            <hr />
            
            {/* <div dangerouslySetInnerHTML={{ __html: artikel.text }} /> */}

            { 
              akses.akses === 'ustadz' && akses.username === this.props.paramsUstadz ? 
                <div className="row justify-content-center">
                  {/* <button type="button" onClick={() => this.props.modeEdit(artikel)} className="btn btn-info btn-rounded">Ubah</button> */}
                  <Link
                    to={{
                      pathname: `/${this.props.paramsUstadz}/artikel/edit/${artikel._id}`,
                    }}
                    // to={'/aoeu/artikel'}
                    className="btn btn-info btn-rounded"
                  >Ubah</Link>

                  <button type="button" onClick={() => this.setState({ show: true })} className="btn btn-danger btn-rounded">Hapus</button>

                  <SweetAlert
                    show={this.state.show}
                    title="Peringatan!"
                    text="Apakah anda yakin menghapus nya?"
                    onConfirm={() => this.delArtikel(artikel._id)}
                    onCancel={() => this.setState({ show: false })}
                    showCancelButton
                  />
                </div>
                :
                '' 
            }
            
          </div>
          <div className="rounded-bottom mdb-color lighten-3 text-center pt-3">
            <ul className="list-unstyled list-inline font-small">
              <li className="list-inline-item pr-2 white-text"><i className="fa fa-clock-o pr-1" />{artikel.updatedAt}</li>
              <li className="list-inline-item"><a href="" className="white-text">{artikel.author.name}</a></li>
            </ul>
          </div>
        </div>
      </div>     
    );
  }
}

export default withRouter(ArtikelUstadzList);
