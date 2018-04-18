import React, { Component } from 'react';

class ArtikelList extends Component {
  render() {
    return (
      <div
        style={{
          marginTop: 40,
        }}
        className="col-3"
      >
        {/* Card */}
        <div className="card">
          {/* Card image */}
          <div className="view overlay">
            <img className="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/food.jpg" alt="Card image cap" />
            <a>
              <div className="mask rgba-white-slight waves-effect waves-light" />
            </a>
          </div>
          {/* Button */}
          <a className="btn-floating btn-action ml-auto mr-4 mdb-color lighten-3 waves-effect waves-light"><i className="fa fa-chevron-right pl-1" /></a>

          {/* Card content */}
          <div className="card-body">
            {/* Title */}
            <h4 className="card-title">Judul Artikel</h4>
            <hr />
            {/* Text */}
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
          {/* Card footer */}
          <div className="rounded-bottom mdb-color lighten-3 text-center pt-3">
            <ul className="list-unstyled list-inline font-small">
              <li className="list-inline-item pr-2 white-text"><i className="fa fa-clock-o pr-1" />05/10/2015</li>
              <li className="list-inline-item"><a href="#" className="white-text">Ustadz Abdul Somad</a></li>
            </ul>
          </div>
        </div>
        {/* Card */}
      </div>     
    );
  }
}

export default ArtikelList;
