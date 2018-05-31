import React, { Component } from 'react';

import { Image, TouchableHighlight, Platform } from 'react-native';
import { Content, Card, CardItem, Text, Button, Left, Body } from 'native-base';

class ArtikelList extends Component {
  goToCard = (artikel) => {
    this.props.navigation.navigate(
      'ArtikelDetail',
      { artikel }
    );
  };

  render() {
    const { artikel } = this.props;
    let elementImage;
    if (Platform.OS === 'ios') {
      elementImage = (
        <Image source={{ uri: `http://localhost:3000/uploads/thumb_250/${artikel.image}` }} style={{ height: 190, width: 190, alignSelf: 'center' }} />
      ); 
    } else {
      elementImage = (
        <Image source={{ uri: `http://10.0.3.2:3000/uploads/thumb_250/${artikel.image}` }} style={{ height: 190, width: 190, alignSelf: 'center' }} />
      );
    }
    return (
      <Content>
        <TouchableHighlight
          underlayColor={'rgba(0, 0, 0, 0.054)'}
          onPress={() => this.goToCard(artikel)}
        >
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Left>
                <Body>
                  <Text>{artikel.author.name}</Text>
                  <Text note>{artikel.createdAt}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                {elementImage}
                <Text>
                  {artikel.title}
                </Text>
              </Body>
            </CardItem>
            <CardItem style={{
              width: '100%',
              justifyContent: 'center',
            }}
            >
              <Button
                onPress={() => this.goToCard(artikel)}
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

export default ArtikelList;
