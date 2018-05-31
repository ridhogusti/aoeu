import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, RefreshControl } from 'react-native';
import { Button, Text } from 'native-base';
import ArtikelList from './ArtikelList';
import { fetchAllArtikels, limitArtikelUmum } from '../../actions/artikel';
import { fetchAllVideos } from '../../actions/video';
import { fetchAllAudios } from '../../actions/audio';
import { fetchAllJadwals } from '../../actions/jadwal';
import { fetchUstadzs } from '../../actions/ustadz';

class ArtikelPage extends Component {
  static navigationOptions = {
    // header: null,
    title: 'Artikel',
  };
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      limit: 0,
      data: [],
    };
    // this.props.fetchAllArtikels();
  }
  async componentWillMount() {
    console.log('test artikel');
    // this.handleRefresh();
    await this.props.fetchAllArtikels();
    await this.props.fetchAllVideos();
    await this.props.fetchAllAudios();
    await this.props.fetchAllJadwals();
    await this.props.fetchUstadzs();

    console.log('test artikel again');
    // this.props.fetchAllArtikels().then(() => {
    //   this.setState({ data: this.props.artikels });
    // });
  }
  _handleLoadMore = () => {
    this.setState({ refreshing: true });
    this.props.limitArtikelUmum(this.state.limit).then(() => {
      this.setState({ data: this.props.artikels, refreshing: false });
      this.setState({ limit: this.state.limit + 4 });
    });
  }
  handleRefresh = () => {
    this.setState({
      refreshing: true,
    });
    this.props.fetchAllArtikels().then(() => {
      this.setState({ refreshing: false, data: this.props.artikels, limit: 0 });
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
          this.props.artikels.map(artikel => <ArtikelList navigation={this.props.navigation} artikel={artikel} key={artikel._id} />)
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
    artikels: state.artikels.data,
  };
}

export default connect(mapStateToProps, 
  { fetchAllArtikels,
    limitArtikelUmum,
    fetchAllAudios,
    fetchAllVideos,
    fetchAllJadwals,
    fetchUstadzs,
  })(ArtikelPage);
