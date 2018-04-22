import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
import VideoUstadzList from './VideoUstadzList';
import './styleArtikelUstadz.css';
import { createVideo, fetchVideos, deleteVideo, limitVideo } from '../../actions/video';

class VideoUstadzPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      errors: '',
      editMode: {},
      title: '',
      limit: 0,
    };
  }

  componentDidMount() {
    this.props.fetchVideos(this.props.match.params.username);
    window.scrollTo(0, 0);
  }
  handleEditorChange = (e) => {
    this.setState({ content: e.target.getContent() });
  }
  limitArtikell = () => {
    console.log('hai');
    this.props.limitVideo(this.state.limit, this.props.match.params.username);
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
    
    return (
      <div>
        <div className="row">
        
          <div className="col-4" />
          <div className="col-4">

            <div>

              { 
                akses.akses === 'ustadz' && akses.username === this.props.match.params.username ? 
                  <Link
                    to={`/${this.props.match.params.username}/video/add`}
                    className="btn teal btn-lg btn-block"
                  >Tambah Video</Link>
                  : 
                  ''
              }
              
            </div>
          </div>
          <div className="col-4" />
        </div>

        <div
          className="row" 
          
          style={{
            marginRight: '8%',
            marginLeft: '8%',
          }}
        >

          {
            this.props.videos.map(video => (<VideoUstadzList
              paramsUstadz={this.props.match.params.username} 
              video={video} 
              key={video._id}
              modeEdit={this.modeEdit}
              deleteVideo={this.props.deleteVideo}
            />))
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
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    videos: state.videos.data,
  };
}

export default connect(mapStateToProps, {
  createVideo,
  fetchVideos,
  deleteVideo,
  limitVideo,
})(VideoUstadzPage);

