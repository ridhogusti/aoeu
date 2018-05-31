import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, RefreshControl } from 'react-native';
import { Button, Text } from 'native-base';
import AudioList from './AudioList';
import { fetchAllAudios, limitVideoUmum } from '../../actions/audio';

class AudioPage extends Component {
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
    }).catch(err => console.log(err));
  }
  handleRefresh = () => {
    this.setState({
      refreshing: true,
    });
    this.props.fetchAllAudios().then(() => {
      this.setState({ refreshing: false, data: this.props.audios, limit: 0 });
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
          this.props.audios.map(audio => <AudioList navigator={this.props.navigator} audio={audio} key={audio._id} />)
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
    audios: state.audios.data,
  };
}

export default connect(mapStateToProps, { fetchAllAudios, limitVideoUmum })(AudioPage);
