import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, RefreshControl } from 'react-native';
import { Button, Text } from 'native-base';
import VideoList from './VideoList';
import { fetchAllVideos, limitVideoUmum } from '../../actions/video';

class VideoPage extends Component {
  static navigationOptions = {
    title: 'Video',
    // header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      limit: 0,
      data: [],
    };
  }
  
  _handleLoadMore = () => {
    this.setState({ refreshing: true });
    this.props.limitVideoUmum(this.state.limit).then(() => {
      this.setState({ data: this.props.videos, refreshing: false });
      this.setState({ limit: this.state.limit + 4 });
    });
  }
  handleRefresh = () => {
    this.setState({
      refreshing: true,
    });
    this.props.fetchAllVideos().then(() => {
      this.setState({ refreshing: false, data: this.props.videos, limit: 0 });
    }).catch(err => console.log(err));
  }
  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.handleRefresh()}
          />
        }
      >
        {
          this.props.videos.map(video => <VideoList navigation={this.props.navigation} video={video} key={video._id} />)
        }
        <Button 
          onPress={() => this._handleLoadMore()}
          block
          style={{
            marginTop: 40,
          }}
        >
          <Text>load more</Text>
        </Button>
      </ScrollView>
      
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
