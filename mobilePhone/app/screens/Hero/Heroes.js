import React, { Component } from 'react';
import {
  Container, Content, Text, ListItem, List, Thumbnail, Body,
  Header, Left, Right, Icon, View,
  Button,
} from 'native-base';
import { TouchableOpacity, AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import { Provider } from 'react-redux';
import { registerScreens, registerScreenVisibilityListener } from '../../screens';
import Hero from '../../components/Hero';
import store from '../../store';
// import Icon from 'react-native-vector-icons/Ionicons';
registerScreens(store, Provider); // this is where you register all of your app's screens
registerScreenVisibilityListener();
// start the app

const ACCESS_TOKEN = 'access_token';
export default class Heroes extends Component {
  constructor() {
    super();
    this.state = {
      heroes: [],
      showProgress: false,
    };
  }
  componentDidMount() {
    this.props.fetchHeroes();
  }

  onLogout() {
    this.setState({ showProgress: true });
    this.deleteToken();
  }

  async deleteToken() {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      this.loadLogin();
    } catch (error) {
      console.log('Something went wrong');
    }
  }

  loadLogin() {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'Login',
      },
    });
  }
  renderHeader() {
    return (
      <Header>
        <Left />
        <Body>
          <Text>Heroes</Text>
        </Body>
        <Right>
          <TouchableOpacity
            onPress={() => this.props.navigator.push({ screen: 'push.HeroAdd' })}
          >
            <Icon name="add" style={{ color: '#62AFEF' }} />
          </TouchableOpacity>
        </Right>
      </Header>

    );
  }
  render() {
    if (this.props.data.heroesReducer.fetching) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
                
      );
    }
    return (
      <Container>
        {this.renderHeader()}

        <Content>
          <Button
            onPress={() => this.onLogout()}
          >
            <Text>Logout</Text>
          </Button>

          <ActivityIndicator animating={this.state.showProgress} size="large" />
          {/* <Text>{this.props.data}</Text>*/}
          <List>
            {
              this.props.data.heroesReducer.heroes.map((hero, key) => <Hero key={key} hero={hero} {...this.props} />)
            }
          </List>
        </Content>
      </Container>
    );
  }
}
