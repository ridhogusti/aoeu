import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  // Text,
  View,
  TouchableHighlight,
} from 'react-native';
import { H3, Button, Content, Card, CardItem, Left, Body, Text } from 'native-base';
import * as Animatable from 'react-native-animatable';
import VideoPlayer from 'react-native-video-player';
import { connect } from 'react-redux';
import { fetchVideo } from '../../actions/video';

const SHOW_DURATION = 400;

class VideoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationType: 'fadeInRight',
      animationDuration: SHOW_DURATION,
    };
  }

  componentDidMount() {
    this.props.fetchVideo(this.props.video.author.username);
  }
  goToCard = (video) => {
    this.props.navigator.push({
      screen: 'push.VideoDetail',
      title: 'Detail Video',
      passProps: {
        sharedImageId: `${video._id}`,
        video,
      },
    });
  };
  _renderContent() {
    return (
      <View>

        <View>
          <VideoPlayer
            // endWithThumbnail
            // thumbnail={{ uri: this.state.thumbnailUrl }}
            video={{ uri: `http://192.168.1.3:3000/videos/${this.props.video.video}` }}
            videoWidth={100}
            videoHeight={50}
          />
          <Button
            onPress={() => this.player.stop()}
            title="Stop"
          />
          <Button
            onPress={() => this.player.pause()}
            title="Pause"
          />
          <Button
            onPress={() => this.player.resume()}
            title="Resume"
          />
        </View>
        <Animatable.View
          style={styles.content}
          duration={this.state.animationDuration}
          animation={this.state.animationType}
          useNativeDriver
        >
          <View
            style={{
              height: 'auto',
              paddingBottom: 10,
              paddingTop: 10,
              paddingLeft: 10,
              width: '100%',
              backgroundColor: '#454254',
              justifyContent: 'center',
            }}
          >
            <H3
              style={{
                color: 'white',
              }}
            >{this.props.video.title}</H3>
            <Text
              style={{
                color: '#BBBBBB',
              }}
            >{this.props.video.author.name}</Text>
            <Text
              style={{
                color: '#BBBBBB',
              }}
            >{this.props.video.createdAt}</Text>
          </View>
        </Animatable.View>
      </View>
      
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* {this._renderImage()} */}
        {this._renderContent()}

        {
          this.props.videos.map((video, i) => {
            const nomor = i;
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
                        full textStyle={{ color: '#87838B' }} 
                        style={{
                          width: 1000,
                        }}
                      >
                        <Text>Baca</Text>
                      </Button>
                    </CardItem>
                  </Card>
                </TouchableHighlight>
        
              </Content>
              
            );
          })
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    backgroundColor: 'white',
    marginTop: -135,
  },
  text: {
    fontSize: 17,
    paddingVertical: 4,
    paddingLeft: 8,
  },
});

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    videos: state.videos.data,
  };
}

export default connect(mapStateToProps, { fetchVideo })(VideoDetail);
