import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Container, Content, Text, Thumbnail, Button,
  Header, Left, Body, Title, Right,
} from 'native-base';
import Berita from '../components/Berita';

const ACCESS_TOKEN = 'access_token';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      beritas: [],
    };
  }

  componentDidMount() {
    this.getToken();
  }

  async getToken() {
    try {
      const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      const aoeu = accessToken.split('"');
      console.log(aoeu[3]);
      this.props.getBerita(aoeu[3]);
      console.log(this.props.getBerita(aoeu[3]));
    } catch (error) {
      console.log('Something went wrong');
    }
  }
  _header() {
    return (
      <Header>
        <Left />
        <Body>
          <Title>Berita</Title>
        </Body>
        <Right />
      </Header>
    );
  }
  render() {
    if (this.props.data.homeReducer.fetching) {
      return (
        <Content>
          <Text>Loading...</Text>
        </Content>
      );
    }
    return (
      <Container>
        {this._header()}
        <Content
          style={{ margin: 10 }}
        >

          {
            this.props.data.homeReducer.beritas.map((berita, key) => <Berita key={key} berita={berita} {...this.props} />)
          }

        </Content>
      </Container>
    );
  }
}
