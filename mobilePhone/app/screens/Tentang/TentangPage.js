import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, RefreshControl, View } from 'react-native';
import { Button, Text } from 'native-base';
import AudioList from './AudioList';
import { fetchAllAudios, limitVideoUmum } from '../../actions/audio';

class TentangPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      limit: 0,
      data: [],
    };
  }
  render() {
    return (
      <View>
        <Text>hai</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    audios: state.audios.data,
  };
}

export default connect(mapStateToProps, { fetchAllAudios, limitVideoUmum })(TentangPage);
