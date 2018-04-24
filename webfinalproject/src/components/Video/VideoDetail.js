import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchVideos, limitVideo } from '../../actions/video';

class VideoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 0,
    };
  }
  componentDidMount() {
    console.log(this.props.location.state.video.author.username, 'username nya');
    this.props.fetchVideos(this.props.location.state.video.author.username);
    window.scrollTo(0, 0);
  }
  limitArtikell = () => {
    console.log('hai');
    this.props.limitVideo(this.state.limit, this.props.location.state.video.author.username);
    this.setState({ limit: this.state.limit + 4 });
  }
  render() {
    const { location } = this.props;
    console.log(location);
    const uriImage = `http://localhost:3000/videos/${location.state.video.video}`;
    const linkCover = 'https://brightplanet.com/wp-content/uploads/2016/04/play-1073616_1280-1030x1030.png';
    return (
      <section className="pt-5 mt-4 pb-3">
        <div className="row">
          <div className="col-md-12">
            <div className="card text-center card-cascade wider reverse">
              <div className="view overlay">
                <video
                  className="mx-auto"
                  style={{
                    height: 240,
                    // width: 320,
                  }} controls
                >
                  <source src={uriImage} type="video/mp4" />
                  {/* <source src="movie.ogg" type="video/ogg"> */}
              Your browser does not support the video tag.
                </video>
                <br />
                {/* <a>
                  <div className="mask rgba-white-slight" />
                </a> */}
              </div>
              <div className="card-body text-center">
                <h2>
                  <a className="font-weight-bold">{location.state.video.title}</a>
                </h2>
                <p>Written by
                  <a>{location.state.video.author.name}</a>, {location.state.video.updatedAt}</p>
              </div>
            </div>
            <div className="excerpt mt-5" />
          </div>
        </div>

        <h3>Video Lainnya dari {location.state.video.author.name}</h3>

        <div
          className="row" 
          
          style={{
            marginRight: '8%',
            marginLeft: '8%',
          }}
        >
          {
            this.props.videos.map((video, i) => {
              const nomor = i;
              return (
                <div
                  key={nomor}
                  style={{
                    marginTop: 40,
                  }}
                  className="col-3"
                >
                  <div className="card">
                    <div className="view overlay">
                      <img
                        alt={linkCover}
                        className="card-img-top" src={linkCover}
                      />
                      <a>
                        <div className="mask rgba-white-slight waves-effect waves-light" />
                      </a>
                    </div>
                    <Link
                      to={{
                        pathname: `/video/detail/${video._id}`,
                        state: { video },
                      }}
                      className="btn-floating btn-action ml-auto mr-4 mdb-color lighten-3 waves-effect waves-light"
                    >
                      <i className="fa fa-chevron-right pl-1" />
                    </Link>

                    <div className="card-body">
                      <h4 className="card-title">{video.title}</h4>
                      <hr />
            
                      {/* <div dangerouslySetInnerHTML={{ __html: artikel.text }} /> */}
            
                    </div>
                    <div className="rounded-bottom mdb-color lighten-3 text-center pt-3">
                      <ul className="list-unstyled list-inline font-small">
                        <li className="list-inline-item pr-2 white-text"><i className="fa fa-clock-o pr-1" />{video.updatedAt}</li>
                        <li className="list-inline-item"><a href="" className="white-text">{video.author.name}</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })
          }
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
            <button type="button" onClick={this.limitArtikell} className="btn btn-default">Load More</button>
          </div> 
          <div className="col-4" />

        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    videos: state.videos.data,
  };
}

export default connect(mapStateToProps, { fetchVideos, limitVideo })(VideoDetail);
