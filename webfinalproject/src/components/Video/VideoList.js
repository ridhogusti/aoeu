import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class VideoList extends Component {
  render() {
    const { video } = this.props;
    const uriImage = 'https://brightplanet.com/wp-content/uploads/2016/04/play-1073616_1280-1030x1030.png';
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
            {/* <span
              className="td-video-play-ico"

              style={{
                position: 'absolute',
                zIndex: 1,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                margin: 'auto',
              }}
            >
              <img
                src="https://yufid.tv/wp-content/themes/Newspaper/images/icons/ico-video-large@2x.png"
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  zIndex: 1,
                  width: 40,
                  height: 40,
                  margin: 'auto',
                }}
              />
            </span> */}

            <a>
              <div className="mask rgba-white-slight waves-effect waves-light" />
            </a>
          </div>
          {/* Button */}
          <Link
            to={{
              pathname: `/video/detail/${video._id}`,
              state: { video },
            }}
            className="btn-floating btn-action ml-auto mr-4 mdb-color lighten-3 waves-effect waves-light"
          >
            <i className="fa fa-chevron-right pl-1" />
          </Link>
          {/* <a className="btn-floating btn-action ml-auto mr-4 mdb-color lighten-3 waves-effect waves-light"><i className="fa fa-chevron-right pl-1" /></a> */}

          {/* Card content */}
          <div className="card-body">
            {/* Title */}
            <h4 className="card-title">{video.title}</h4>
            {/* Text */}
          </div>
          {/* Card footer */}
          <div className="rounded-bottom mdb-color lighten-3 text-center pt-3">
            <ul className="list-unstyled list-inline font-small">
              <li className="list-inline-item pr-2 white-text"><i className="fa fa-clock-o pr-1" />{video.updatedAt}</li>
              <li className="list-inline-item"><a className="white-text">{video.author.name}</a></li>
            </ul>
          </div>
        </div>
        {/* Card */}
      </div>     
    );
  }
}

export default VideoList;
