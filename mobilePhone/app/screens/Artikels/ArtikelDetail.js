import React, { Component } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';
import { H3 } from 'native-base';
// import { SharedElementTransition } from 'react-native-navigation';
import HTMLView from 'react-native-htmlview';
import * as Animatable from 'react-native-animatable';

const SHOW_DURATION = 400;
const HIDE_DURATION = 300;

class ArtikelDetail extends Component {
  constructor(props) {
    super(props);
    // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      animationType: 'fadeInRight',
      animationDuration: SHOW_DURATION,
    };
  }

  _renderImage() {
    let elementImage;
    if (Platform.OS === 'ios') {
      elementImage = (
        <Image
          style={styles.image}
          source={{ uri: `http://localhost:3000/uploads/thumb_250/${this.props.navigation.getParam('artikel').image}` }}
        />
      );
    } else {
      elementImage = (
        <Image
          style={styles.image}
          source={{ uri: `http://10.0.3.2:3000/uploads/thumb_250/${this.props.navigation.getParam('artikel').image}` }}
        />
      );
    }
    return (
      <View>
        { elementImage }
      </View>
    );
  }

  _renderContent() {
    return (
      <Animatable.View
        style={styles.content}
        duration={this.state.animationDuration}
        animation={this.state.animationType}
        useNativeDriver
      >
        <View
          style={{
            height: 100,
            width: '100%',
            backgroundColor: '#454254',
            justifyContent: 'center',
          }}
        >
          <H3
            style={{
              color: 'white',
            }}
          >{this.props.navigation.getParam('artikel').title}</H3>
          <Text
            style={{
              color: '#BBBBBB',
            }}
          >{this.props.navigation.getParam('artikel').author.name}</Text>
          <Text
            style={{
              color: '#BBBBBB',
            }}
          >{this.props.navigation.getParam('artikel').createdAt}</Text>
        </View>
        <HTMLView
          value={this.props.navigation.getParam('artikel').text}
          stylesheet={styles}
        />
      </Animatable.View>
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this._renderImage()}
        {this._renderContent()}
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
    flex: 1,
    // marginTop: 230,
    backgroundColor: 'white',
  },
  imageContainer: {
    position: 'absolute',
    width: '100%',
    top: 0,
    // left: 0,
    // right: 0,
  },
  image: {
    height: 230,
    // width: 190,
  },
  text: {
    fontSize: 17,
    paddingVertical: 4,
    paddingLeft: 8,
  },
});

export default ArtikelDetail;
