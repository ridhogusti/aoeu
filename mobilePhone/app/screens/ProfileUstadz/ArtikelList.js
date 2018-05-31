import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';

import { Image, TouchableHighlight, StyleSheet, AsyncStorage, Dimensions, Alert, Platform } from 'react-native';
import { Content, Card, CardItem, Text, Button, Left, Body } from 'native-base';

const { height, width } = Dimensions.get('window');

class ArtikelList extends Component {
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
  goToCard = (artikel) => {
    this.props.navigation.navigate(
      'ArtikelUstadzDetail',
      { artikel }
    );
  };

  render() {
    const { artikel } = this.props;

    let elementButton = [];
    if (this.state.akses === null) {
      elementButton = (<Text>test</Text>);
      console.log('tidak ada button');
    } else if (this.state.akses.akses === 'ustadz' && this.state.akses.username === this.props.artikel.author.username) {
      const token = this.state.token.split('"');
      elementButton[0] = (
        <Button
          key="0"
          onPress={() => this.props.navigation.navigate(
            'TambahArtikelUstadz',
            { artikel }
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
              'Hapus Artikel',
              'Apakah Anda yakin?',
              [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => this.props.delArtikel(artikel._id, token[1]) },
              ],
              { cancelable: false }
            )
          }
        >
          <Text>Hapus</Text>
        </Button>
      );
    }

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
      <Content
        style={{
          width,
        }}
      >
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
                {/* <SharedElementTransition
                  style={styles.imageContainer}
                  sharedElementId={`${artikel._id}`}
                > */}
                {/* <Image source={{ uri: `http://localhost:3000/uploads/thumb_250/${artikel.image}` }} style={{ height: 190, width: 190, alignSelf: 'center' }} /> */}
                {elementImage}
                {/* </SharedElementTransition> */}
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

export default ArtikelList;
const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
