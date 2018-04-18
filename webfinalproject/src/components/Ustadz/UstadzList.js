import React, { Component } from 'react';

class UstadzList extends Component {
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
            <img 
              className="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/food.jpg"
            />

            <a>
              <div className="mask rgba-white-slight waves-effect waves-light" />
            </a>
          </div>
          {/* Button */}
          <a className="btn-floating btn-action ml-auto mr-4 mdb-color lighten-3 waves-effect waves-light">
            <i className="fa fa-chevron-right pl-1" />
          </a>
          {/* Card content */}
          <div className="card-body">
            {/* Title */}
            <h4 className="card-title">Ustdaz Abdul Somad</h4>
            {/* Text */}
          </div>
          {/* Card footer */}
          
        </div>
        {/* Card */}
      </div>     
    );
  }
}

export default UstadzList;
