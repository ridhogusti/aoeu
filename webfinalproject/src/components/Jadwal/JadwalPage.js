import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './scriptartikel';
import JadwalList from './JadwalList';

class AudioPage extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <div
          className="row"
        >
        
          <div className="col-1" />
          <div className="col-10">
            {/* Carousel Wrapper*/}
            <div id="carousel-example-1z" className="carousel slide carousel-fade" data-ride="carousel">
              {/* Indicators*/}
              <ol className="carousel-indicators">
                <li data-target="#carousel-example-1z" data-slide-to={0} className="active" />
                <li data-target="#carousel-example-1z" data-slide-to={1} />
                <li data-target="#carousel-example-1z" data-slide-to={2} />
              </ol>
              {/* /.Indicators*/}
              {/* Slides*/}
              <div className="carousel-inner" role="listbox">
                {/* First slide*/}
                <div className="carousel-item active">
                  <img className="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg" alt="First slide" />
                </div>
                {/* /First slide*/}
                {/* Second slide*/}
                <div className="carousel-item">
                  <img className="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20(129).jpg" alt="Second slide" />
                </div>
                {/* /Second slide*/}
                {/* Third slide*/}
                <div className="carousel-item">
                  <img className="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg" alt="Third slide" />
                </div>
                {/* /Third slide*/}
              </div>
              {/* /.Slides*/}
              {/* Controls*/}
              <a className="carousel-control-prev" href="#carousel-example-1z" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carousel-example-1z" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="sr-only">Next</span>
              </a>
              {/* /.Controls*/}
            </div>
            {/* /.Carousel Wrapper*/}

          </div>

          <div className="col-1" />
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
                      <JadwalList /> 
                      <JadwalList /> 
                      <JadwalList /> 
                      <JadwalList /> 
                      <JadwalList /> 
                      <JadwalList /> 
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
          <div className="col-4">
            <nav className="my-4">
              <ul className="pagination pagination-circle pg-blue mb-0">
                {/* First*/}
                <li className="page-item disabled"><a className="page-link waves-effect waves-effect">First</a></li>
                {/* Arrow left*/}
                <li className="page-item disabled">
                  <a className="page-link waves-effect waves-effect" aria-label="Previous">
                    <span aria-hidden="true">«</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
                {/* Numbers*/}
                <li className="page-item active"><a className="page-link waves-effect waves-effect">1</a></li>
                <li className="page-item"><a className="page-link waves-effect waves-effect">2</a></li>
                <li className="page-item"><a className="page-link waves-effect waves-effect">3</a></li>
                <li className="page-item"><a className="page-link waves-effect waves-effect">4</a></li>
                <li className="page-item"><a className="page-link waves-effect waves-effect">5</a></li>
                {/* Arrow right*/}
                <li className="page-item">
                  <a className="page-link waves-effect waves-effect" aria-label="Next">
                    <span aria-hidden="true">»</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
                {/* First*/}
                <li className="page-item"><a className="page-link waves-effect waves-effect">Last</a></li>
              </ul>
            </nav>
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
  };
}

export default connect(mapStateToProps, {})(AudioPage);
