import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
// import { ScrollView, RefreshControl } from 'react-native';
import {
  View,
  ScrollView,
  AsyncStorage,
  StyleSheet,
  // Image,
  Dimensions,
  // FlatList,
} from 'react-native';
import { Container, Content, Icon, Text, Button, H2, Header, Left, Body, Title, Right } from 'native-base';
// import EntypoIcon from 'react-native-vector-icons/Entypo';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { limitUstadz, fetchUstadzs } from '../../actions/ustadz';
import { fetchArtikels, limitArtikel, getCountArtikelUstadz, deleteArtikel } from '../../actions/artikel';
import { fetchAllVideosUstadz, limitVideo, getCountVideoUstadz } from '../../actions/video';
import { fetchAudios } from '../../actions/audio';
import { fetchJadwals } from '../../actions/jadwal';
import ArtikelList from './ArtikelList';
import VideoList from './VideoList';
import AudioList from './AudioList';
import JadwalList from './JadwalList';

class UstadzPage extends Component {
  static navigatorStyle = {
    screenBackgroundColor: 'white',
    navBarHidden: true, 
  };
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      limit: 0,
      activeIndex: 0,
      data: [],
      akses: null,
    };
  }

  async componentWillMount() {
    if (await AsyncStorage.getItem('jwtToken') == null) {
      this.setState({ akses: { akses: 'tidak ada', username: 'tidak ada' } });
    } else {
      this.setState({ akses: jwtDecode(await AsyncStorage.getItem('jwtToken')) });
    }
    await this.props.fetchArtikels(this.props.ustadz.username);
    await this.props.getCountArtikelUstadz(this.props.ustadz.username);
    await this.props.fetchAllVideosUstadz(this.props.ustadz.username);
    await this.props.fetchAudios(this.props.ustadz.username);
    await this.props.fetchJadwals(this.props.ustadz.username);
    await this.props.getCountVideoUstadz(this.props.ustadz.username);

    console.log(this.state.akses, 'dari cmw');
  }

  deleteArtikel = (id, token) => {
    console.log(id, 'yang mau di delete bro');
    this.props.deleteArtikel(id, token);
  }

  _handleLoadMore = () => {
    this.setState({ refreshing: true });
    this.props.limitArtikel(this.state.limit - this.props.jumlahDelete, this.props.ustadz.username).then(() => {
      this.setState({ data: this.props.artikels, refreshing: false });
      this.setState({ limit: this.state.limit + 4 });
    });
  }
  segmentClicked(index) {
    this.setState({
      activeIndex: index,
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
    } else if (this.state.akses.akses === 'ustadz' && this.state.akses.username === this.props.ustadz.username) {
      elementButton = (
        <Button
          block style={{
            marginTop: 10,
          }}
          onPress={() => this.props.navigator.push({
            screen: 'push.ArtikelForm',
            title: 'Tambah Artikel',
          })}
        >
          <Text>Tambah Artikel</Text>
        </Button>
      );
    }
    return (
      <View>
        {elementButton}
        {
          this.props.artikelustadz.map(artikel => <ArtikelList delArtikel={this.deleteArtikel} navigator={this.props.navigator} artikel={artikel} key={artikel._id} />)
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
    } else if (this.state.akses.akses === 'ustadz' && this.state.akses.username === this.props.ustadz.username) {
      elementButton = (
        <Button
          block style={{
            marginTop: 10,
          }}
          onPress={() => this.props.navigator.push({
            screen: 'push.VideoForm',
            title: 'Tambah Video',
          })}
        >
          <Text>Tambah Video</Text>
        </Button>
      );
    }
    return (
      <View>
        {elementButton}
        {
          this.props.videoustadz.map(video => <VideoList navigator={this.props.navigator} video={video} key={video._id} />)
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

  goBack = () => {
    this.segmentClicked(0);
    // this.kembali();
  }

  kembali = () => {
    this.props.navigator.pop();
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              onPress={this.goBack}
              transparent
            >
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Profil Ustadz</Title>
          </Body>
          <Right />
        </Header>

        <Content>
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
            >{this.props.ustadz.name}</H2>
          </View>
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#eae5e5' }}>
              <Button

                onPress={() => this.segmentClicked(0)}
                transparent
                active={this.state.activeIndex === 0}

              >
                <Icon
                  name="ios-apps-outline"
                  style={[this.state.activeIndex === 0 ? {} : { color: 'grey' }]}
                />
              </Button>
              <Button
                onPress={() => this.segmentClicked(1)}
                transparent active={this.state.activeIndex === 1}
              >
                <Icon name="ios-list-outline" style={[{ fontSize: 32 }, this.state.activeIndex === 1 ? {} : { color: 'grey' }]} />
              </Button>
              <Button
                onPress={() => this.segmentClicked(2)}
                transparent active={this.state.activeIndex === 2}
              >
                <Icon name="ios-bookmark-outline" style={this.state.activeIndex === 2 ? {} : { color: 'grey' }} />
              </Button>
              <Button
                onPress={() => this.segmentClicked(3)}
                transparent last active={this.state.activeIndex === 3}
              >
                <Icon name="ios-people-outline" style={[{ fontSize: 32 }, this.state.activeIndex === 3 ? {} : { color: 'grey' }]} />
              </Button>
            </View>

            {this.renderSection()} 
          </View>
        </Content>
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
})(UstadzPage);
