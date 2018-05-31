import React, { Component } from 'react';
import { Image, TouchableOpacity, Dimensions, Animated, View,
  StyleSheet,
} from 'react-native';
import { CardItem, Left, Thumbnail, Body, Text, Button, Icon, Card } from 'native-base';
import ReadMore from 'react-native-read-more-text';
import { SharedElementTransition } from 'react-native-navigation';

const styles = StyleSheet.create({
  
  button: {
    backgroundColor: '#333',
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFF',
  },
});

class Berita extends Component {
  // _renderRevealedFooter = (handlePress) => (
  //   <RegularText style={{ color: Colors.tintColor, marginTop: 5 }} onPress={handlePress}>
  //       Show less
  //   </RegularText>
  // )

  // _handleTextReady = () => {
  //   // ...
  // }

  _renderTruncatedFooter = (handlePress) => (
    <Button 
      bordered
      success
      block
      onPress={handlePress}
      // style={{ alignSelf: 'center' }}
    >
      <Text>Baca lagi ...</Text>
    </Button>
    
  )
  render() {
    const { berita, navigator } = this.props;
    return (

      <Card
        style={{ flex: 0 }}
      >
        <CardItem>
          <Body>

            <TouchableOpacity
              onPress={() => navigator.push({
                screen: 'push.HomeView',
                sharedElements: [`image${berita.id}`],
                animated: false,
                overrideBackPress: true,
                passProps: {
                  berita,
                  list: 'matematika',
                  sharedImageId: `image${berita.id}`,
                },
              })}
            >
              <SharedElementTransition
                sharedElementId={`image${berita.id}`}
              >
                <Image 
                  source={{ uri: `http://pantausiswa.xyz/uploads/${berita.image}` }} 
                  style={{ alignSelf: 'center', height: 200, width: Dimensions.get('window').width - 30, justifyContent: 'center', alignItems: 'center' }} 
                />
              </SharedElementTransition>
              
            </TouchableOpacity> 
            <ReadMore
              numberOfLines={2}
              renderTruncatedFooter={this._renderTruncatedFooter}
              renderRevealedFooter={this._renderRevealedFooter}
              onReady={this._handleTextReady}
            >
              <Text>
                {berita.content}
              </Text>
            </ReadMore>

            <Text>asonetuh</Text>
          
          </Body>
        </CardItem>
          
      </Card> 

    );
  }
}

export default Berita;

