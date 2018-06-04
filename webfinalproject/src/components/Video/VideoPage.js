import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './scriptartikel';
import VideoList from './VideoList';
import { fetchAllVideos, limitVideoUmum } from '../../actions/video';

class VideoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 0,
    };
  }
  componentDidMount() {
    this.props.fetchAllVideos();
    window.scrollTo(0, 0);
  }
  limitArtikell = () => {
    console.log('hai');
    this.props.limitVideoUmum(this.state.limit);
    this.setState({ limit: this.state.limit + 4 });
  }
  render() {
    const { videos } = this.props;
    return (
      <div>
        <div
          style={{
            background: 'black',
            marginRight: '8%',
            marginLeft: '8%',
            textAlign: 'center',
          }}
        >

          <img
            src="http://3.bp.blogspot.com/-p6dsThHBKPI/VmBN6m6szHI/AAAAAAAABcc/gD96RN0VDOc/s1600/kebaiakan.png"
            width="70%"
            style={{
              justifySelf: 'center',
            }}
          />
        </div> 

        <div
          className="row" 

          style={{
            marginRight: '8%',
            marginLeft: '8%',
          }}
        >
          {
            videos.map(video => <VideoList video={video} key={video._id} />)
          }
          {/* <VideoList />
          <VideoList />
          <VideoList />
          <VideoList />
          <VideoList /> */}
          
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

export default connect(mapStateToProps, { fetchAllVideos, limitVideoUmum })(VideoPage);
