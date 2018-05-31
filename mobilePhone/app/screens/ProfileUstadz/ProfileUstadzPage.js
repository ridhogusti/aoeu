import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
// import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import {
  View,
  ScrollView,
  AsyncStorage,
  // Dimensions,
} from 'react-native';
import { Container, Content, Text, Button, H2, Tab, Tabs, TabHeading } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { limitUstadz, fetchUstadzs } from '../../actions/ustadz';
import { fetchArtikels, limitArtikel, getCountArtikelUstadz, deleteArtikel } from '../../actions/artikel';
import { fetchAllVideosUstadz, limitVideo, getCountVideoUstadz, deleteVideo } from '../../actions/video';
import { fetchAudios } from '../../actions/audio';
import { fetchJadwals } from '../../actions/jadwal';
import ArtikelList from './ArtikelList';
import VideoList from './VideoList';
import AudioList from './AudioList';
import JadwalList from './JadwalList';

class UstadzPage extends Component {
  // static navigatorStyle = {
  //   screenBackgroundColor: 'white',
  // };
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      limit: 0,
      activeIndex: 0,
      data: [],
      akses: null,
      index: 0,
      routes: [
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
      ], 
    };
  }

  async componentWillMount() {
    if (await AsyncStorage.getItem('jwtToken') == null) {
      this.setState({ akses: { akses: 'tidak ada', username: 'tidak ada' } });
    } else {
      this.setState({ akses: jwtDecode(await AsyncStorage.getItem('jwtToken')) });
    }
    await this.props.fetchArtikels(this.props.navigation.getParam('ustadz').username);
    await this.props.getCountArtikelUstadz(this.props.navigation.getParam('ustadz').username);
    await this.props.fetchAllVideosUstadz(this.props.navigation.getParam('ustadz').username);
    await this.props.fetchAudios(this.props.navigation.getParam('ustadz').username);
    await this.props.fetchJadwals(this.props.navigation.getParam('ustadz').username);
    await this.props.getCountVideoUstadz(this.props.navigation.getParam('ustadz').username);

    console.log(this.state.akses, 'dari cmw');
  }

  deleteArtikel = (id, token) => {
    console.log(id, 'yang mau di delete bro');
    this.props.deleteArtikel(id, token);
  }

  deleteVideo = (id, token) => {
    console.log(id, 'yang mau di delete bro');
    this.props.deleteVideo(id, token);
  }

  _handleLoadMore = () => {
    this.setState({ refreshing: true });
    this.props.limitArtikel(this.state.limit - this.props.jumlahDelete, this.props.navigation.getParam('ustadz').username).then(() => {
      this.setState({ data: this.props.artikels, refreshing: false });
      this.setState({ limit: this.state.limit + 4 });
    });
  }

  renderSectionOne() {
    let loadMore;
    // 
    if (this.props.countArtikelUstadz === this.props.artikelustadz.length) {
      console.log('asnteu');
      // loadMore = (
      //   <div>test</div>
      // );
    } else {
      loadMore = (
        <Button 
          onPress={() => this._handleLoadMore()}
          block
          style={{
            marginTop: 40,
          }}
        >
          <Text>load more</Text>
        </Button>
      );
    }
    let elementButton;
    if (this.state.akses === null) {
      elementButton = (<Text>test</Text>);
      console.log('tidak ada button');
    } else if (this.state.akses.akses === 'ustadz' && this.state.akses.username === this.props.navigation.getParam('ustadz').username) {
      elementButton = (
        <Button
          block style={{
            marginTop: 10,
          }}
          onPress={() => this.props.navigation.navigate(
            'TambahArtikelUstadz',
          )}
        >
          <Text>Tambah Artikel</Text>
        </Button>
      );
    }
    return (
      <View>
        {elementButton}
        {
          this.props.artikelustadz.map(artikel => <ArtikelList delArtikel={this.deleteArtikel} navigation={this.props.navigation} artikel={artikel} key={artikel._id} />)
        }
        {loadMore}
      </View>
    );
  }

  renderSectionTwo() {
    let loadMore;
    if (this.props.countVideoUstadz === this.props.videoustadz.length) {
      console.log('asnteu');
    } else {
      loadMore = (
        <Button 
          onPress={() => this._handleLoadMore()}
          block
          style={{
            marginTop: 40,
          }}
        >
          <Text>load more</Text>
        </Button>
      );
    }
    let elementButton;
    if (this.state.akses === null) {
      elementButton = (<Text>test</Text>);
      console.log('tidak ada button');
    } else if (this.state.akses.akses === 'ustadz' && this.state.akses.username === this.props.navigation.getParam('ustadz').username) {
      elementButton = (
        <Button
          block style={{
            marginTop: 10,
          }}
          onPress={() => this.props.navigation.navigate(
            'TambahVideoUstadz',
          )}
          // onPress={() => this.props.navigator.push({
          //   screen: 'push.VideoForm',
          //   title: 'Tambah Video',
          // })}
        >
          <Text>Tambah Video</Text>
        </Button>
      );
    }
    return (
      <View>
        {elementButton}
        {
          this.props.videoustadz.map(video => <VideoList delVideo={this.deleteVideo} navigation={this.props.navigation} video={video} key={video._id} />)
        }
        {loadMore}
      </View>
    );
  }

  renderSectionThree() {
    return (
      <ScrollView>
        {
          this.props.audioustadz.map(audio => <AudioList navigator={this.props.navigator} audio={audio} key={audio._id} />)
        }
        {/* {loadMore} */}
      </ScrollView>
    );
  }

  renderSectionFour() {
    return (
      <ScrollView>
        {
          this.props.jadwalustadz.map(jadwal => <JadwalList navigator={this.props.navigator} jadwal={jadwal} key={jadwal._id} />)
        }
      </ScrollView>
    );
  }
  
  renderSection() {
    if (this.state.activeIndex === 0) {
      return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

          {this.renderSectionOne()}
        </View>
      );
    } else if (this.state.activeIndex === 1) {
      return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

          {this.renderSectionTwo()}
        </View>
      );
    } else if (this.state.activeIndex === 2) {
      return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

          {this.renderSectionThree()}
        </View>
      );
    } else if (this.state.activeIndex === 3) {
      return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

          {this.renderSectionFour()}
        </View>
      );
    }
  }

  render() {
    return (
      <Container>
        <View
          style={{
            width: '100%',
            height: 150,
            backgroundColor: '#BBBFC4',
            justifyContent: 'center',
          }}
        >
          <H2
            style={{
              alignSelf: 'center',
            }}
          >{this.props.navigation.getParam('ustadz').name}</H2>
        </View>
        <Tabs>
          <Tab heading={<TabHeading><Icon color="white" name="newspaper" size={20} /></TabHeading>}>
            <Content>
              {this.renderSectionOne()}
            </Content>
          </Tab>

          <Tab heading={<TabHeading><Icon color="white" name="video" size={20} /></TabHeading>}>
            <Content>
              {this.renderSectionTwo()}
            </Content>
          </Tab>

          <Tab heading={<TabHeading><Icon color="white" name="audiobook" size={20} /></TabHeading>}>
            <Content>
              {this.renderSectionThree()}
            </Content>
          </Tab>

          <Tab heading={<TabHeading><Icon color="white" name="alarm" size={20} /></TabHeading>}>
            <Content>
              {this.renderSectionFour()}
            </Content>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    artikelustadz: state.artikelustadz.data,
    videoustadz: state.videoustadz.data,
    jumlahDelete: state.artikelustadz.jumlahDelete,
    countArtikelUstadz: state.countArtikelUstadz.data.data,
    countVideoUstadz: state.countVideoUstadz.data.data,
    audioustadz: state.audioustadz.data,
    jadwalustadz: state.jadwalustadz.data,
  };
}

export default connect(mapStateToProps, { fetchUstadzs,
  limitUstadz,
  fetchArtikels,
  limitArtikel,
  getCountArtikelUstadz,
  fetchAllVideosUstadz,
  limitVideo,
  getCountVideoUstadz,
  fetchAudios,
  fetchJadwals,
  deleteArtikel,
  deleteVideo,
})(UstadzPage);
