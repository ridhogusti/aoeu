import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UstadzList extends Component {
  render() {
    const { ustadz } = this.props;
    const urlUstadz = `${ustadz.username}/artikel`;
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

          {/* <a href="/namaustadz/artikel" className="btn-floating btn-action ml-auto mr-4 mdb-color lighten-3 waves-effect waves-light"> */}
          <Link
            to={urlUstadz} 
            className="btn-floating btn-action ml-auto mr-4 mdb-color lighten-3 waves-effect waves-light"
          > 
            <i className="fa fa-chevron-right pl-1" />
          </Link>
          {/* </a> */}
          {/* Card content */}
          <div className="card-body">
            {/* Title */}
            <h4 className="card-title">{ustadz.name}</h4>
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
