import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ArtikelList extends Component {
  render() {
    const { artikel } = this.props;
    const uriImage = `http://localhost:3000/images/${artikel.image}`;
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
              alt={uriImage}
              className="card-img-top" src={uriImage}
            />
            <a>
              <div className="mask rgba-white-slight waves-effect waves-light" />
            </a>
          </div>
          {/* Button */}
          <Link
            to={{
              pathname: `/artikel/detail/${artikel._id}`,
              state: { artikel },
            }}
            className="btn-floating btn-action ml-auto mr-4 mdb-color lighten-3 waves-effect waves-light"
          >
            <i className="fa fa-chevron-right pl-1" />
          </Link>
          {/* <a 
            className="btn-floating btn-action ml-auto mr-4 mdb-color lighten-3 waves-effect waves-light"
          >
            <i className="fa fa-chevron-right pl-1" />
          </a> */}

          {/* Card content */}
          <div className="card-body">
            {/* Title */}
            <h4 className="card-title">{artikel.title}</h4>
            {/* <hr /> */}
            {/* Text */}
            {/* <div dangerouslySetInnerHTML={{ __html: artikel.text }} /> */}
          </div>
          {/* Card footer */}
          <div className="rounded-bottom mdb-color lighten-3 text-center pt-3">
            <ul className="list-unstyled list-inline font-small">
              <li className="list-inline-item pr-2 white-text"><i className="fa fa-clock-o pr-1" />{artikel.updatedAt}</li>
              <li className="list-inline-item"><a href="" className="white-text">{artikel.author.name}</a></li>
            </ul>
          </div>
        </div>
        {/* Card */}
      </div>     
    );
  }
}

export default ArtikelList;
