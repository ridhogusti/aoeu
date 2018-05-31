import React, { Component } from 'react';

import { Image, TouchableHighlight, Alert, AsyncStorage } from 'react-native';
import jwtDecode from 'jwt-decode';
import { Content, Card, CardItem, Text, Button, Left, Body } from 'native-base';

class VideoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      akses: null,
      token: null,
    };
  }

  async componentWillMount() {
    this.setState({ token: await AsyncStorage.getItem('jwtToken') });
    if (await AsyncStorage.getItem('jwtToken') == null) {
      this.setState({ akses: { akses: 'tidak ada', username: 'tidak ada' } });
    } else {
      this.setState({ akses: jwtDecode(await AsyncStorage.getItem('jwtToken')) });
    }
  }
  goToCard = (video) => {
    this.props.navigation.navigate(
      'VideoUstadzDetail',
      { video }
    );
  };

  render() {
    const { video } = this.props;

    let elementButton = [];
    if (this.state.akses === null) {
      elementButton = (<Text>test</Text>);
      console.log('tidak ada button');
    } else if (this.state.akses.akses === 'ustadz' && this.state.akses.username === this.props.video.author.username) {
      const token = this.state.token.split('"');
      elementButton[0] = (
        <Button
          key="0"
          onPress={() => this.props.navigation.navigate(
            'EditVideoUstadz',
            { video }
          )}
          // onPress={() => this.props.navigator.push({
          //   screen: 'push.ArtikelForm',
          //   title: 'Edit Artikel',
          //   passProps: {
          //     artikel,
          //   },
          // })}
        >
          <Text>Edit</Text>
        </Button>
      );
      elementButton[1] = (
        <Button
          key="1"
          onPress={
            () => Alert.alert(
              'Hapus Video',
              'Apakah Anda yakin?',
              [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => this.props.delVideo(video._id, token[1]) },
              ],
              { cancelable: false }
            )
          }
        >
          <Text>Hapus</Text>
        </Button>
      );
    }
    return (
      <Content>
        <TouchableHighlight
          underlayColor={'rgba(0, 0, 0, 0.054)'}
          onPress={() => this.goToCard(video)}
        >
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Left>
                <Body>
                  <Text>{video.author.name}</Text>
                  <Text note>{video.createdAt}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                {/* <SharedElementTransition
                  style={styles.imageContainer}
                  sharedElementId={`${video._id}`}
                > */}
                {/* <Image source={{ uri: `http://192.168.1.3:3000/images/${artikel.image}` }} style={{ height: 190, width: 190, alignSelf: 'center' }} /> */}
                <Image source={{ uri: 'https://brightplanet.com/wp-content/uploads/2016/04/play-1073616_1280-1030x1030.png' }} style={{ height: 190, width: '59%', alignSelf: 'center' }} />
                {/* </SharedElementTransition> */}
                <Text>
                  {video.title}
                </Text>
              </Body>
            </CardItem>
            <CardItem style={{
              width: '100%',
              justifyContent: 'center',
            }}
            >
              <Button
                onPress={() => this.goToCard(video)}
                // full textStyle={{ color: '#87838B' }} 
                // style={{
                //   width: 1000,
                // }}
              >
                <Text>Baca</Text>
              </Button>
              {elementButton}
            </CardItem>
          </Card>
        </TouchableHighlight>
        
      </Content>
    );
  }
}

export default VideoList;
// const styles = StyleSheet.create({
//   imageContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     alignContent: 'center',
//   },
// });
