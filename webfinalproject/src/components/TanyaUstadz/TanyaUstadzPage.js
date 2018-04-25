import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
// import TanyaUstadzList from './TanyaUstadzList';
import './styleArtikelUstadz.css';
import { createJawab, createTanya, fetchTanyas } from '../../actions/tanya';

class TanyaUstadzPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      errors: '',
      editMode: {},
      title: '',
      limit: 0,
      idtanya: null,
    };
  }

  componentDidMount() {
    const akses = jwtDecode(localStorage.getItem('jwtToken')); 
    this.props.fetchTanyas(this.props.match.params.username, akses._id);
    window.scrollTo(0, 0);
  }

  handleSubmitTanya = () => {
    // e.preventDefault();
    // const { idtanya } = this.state;
    const tanya = this.tanyaInput.value;
    const username = this.props.match.params.username;
    console.log();
    this.props.createTanya(tanya, username);
  }
  handleSubmitJawab = (idtanya, i) => {
    // e.preventDefault();
    // const { idtanya } = this.state;
    const jawab = this[i].value;
    console.log(jawab, idtanya);
    this.props.createJawab(idtanya, jawab);
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
    console.log(this.props.tanya, 'tanya');
    
    return (
      <div>
        <div className="row">
        
          <div className="col-4" />
          <div className="col-4" />
          <div className="col-4" />
        </div>
        <br />
        { 
          akses.akses === 'ustadz' && akses.username === this.props.match.params.username ? 
            <div>

              <div
                className="row" 

                style={{
                  marginRight: '8%',
                  marginLeft: '8%',
                }}
              >
                <div className="col-12">
                  {
                    this.props.tanya.map((value, i) => {
                      let element;
                      if (value.jawab === '') {
                        element = (
                          <div>
                            <textarea
                              ref={jawabInput => (this[i] = jawabInput)}
                              onChange={this.handleChange}
                              value={this.state.tempat}
                              name="jawab" id="" cols="30" rows="2" 
                              className="form-control"
                            />
                            <div className="text-center mt-4">
                              <button onClick={() => this.handleSubmitJawab(value._id, i)} className="btn btn-indigo" type="submit">Kirim</button>
                            </div>
                          </div>
                        );
                      } else {
                        element = (
                          <div className="card">
                            <div className="card-body">
                              <h4 className="card-title">{value.ustadz.name}</h4>
                              <p className="card-text">{value.jawab}</p>
                            </div>
                          </div>
                    
                        );
                      }
                      return (
                        <div>
                          <br />
                          <div className="card">
                            <div className="card-body">
                              <h4 className="card-title">{value.umat.name}</h4>
                              <h6 className="card-subtitle mb-2 text-muted">{value.createdAt}</h6>
                              <p className="card-text">{value.tanya}</p>
                              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">Jawaban Ustadz</label>
                      
                              {element}
                            </div>
                          </div>
                        </div>
                  
                      );
                    })
                  }
            
                </div>
          
              </div>
              {/* <div 
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

              </div> */}
            </div>
            
            : 
            ''
        }

        { 
          akses.akses === 'umat' ? 
            <div>
              <div>
                <textarea
                  ref={tanyaInput => (this.tanyaInput = tanyaInput)}
                  onChange={this.handleChange}
                  value={this.state.tempat}
                  name="jawab" id="" cols="30" rows="2" 
                  className="form-control"
                  placeholder="Tulis Pertanyaan Anda!"
                />
                <div className="text-center mt-4">
                  <button onClick={this.handleSubmitTanya} className="btn btn-indigo" type="submit">Kirim</button>
                </div>
              </div>
              <div
                className="row" 

                style={{
                  marginRight: '8%',
                  marginLeft: '8%',
                }}
              >
                <div className="col-12">
                  {
                    this.props.tanya.map((value, i) => {
                      let element;
                      if (value.jawab == '') {
                        element = (<p className="card-text">Belum diJawab</p>);
                      } else {
                        element = (<p className="card-text">{value.jawab}</p>);
                      }
                      return (
                        <div>
                          <br />
                          <div className="card">
                            <div className="card-body">
                              <h4 className="card-title">{value.umat.name}</h4>
                              <h6 className="card-subtitle mb-2 text-muted">{value.createdAt}</h6>
                              <p className="card-text">{value.tanya}</p>
                              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">Jawaban Ustadz</label>
                              <div className="card">
                                <div className="card-body">
                                  <h4 className="card-title">{value.ustadz.name}</h4>
                                  {element}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                  
                      );
                    }
                    )
                  }
            
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
            
            : 
            ''
        }
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    tanya: state.tanya.data,
  };
}

export default connect(mapStateToProps, {
  createJawab,
  createTanya,
  fetchTanyas,
})(TanyaUstadzPage);

