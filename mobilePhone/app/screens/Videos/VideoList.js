import React, { Component } from 'react';

import { Image, TouchableHighlight, StyleSheet } from 'react-native';
import { Content, Card, CardItem, Text, Button, Left, Body } from 'native-base';

class VideoList extends Component {
  goToCard = (video) => {
    this.props.navigation.navigate(
      'VideoDetail',
      { video }
    );
  };

  render() {
    const { video } = this.props;
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
  }
}

export default VideoList;
const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    alignContent: 'center',
  },
});
