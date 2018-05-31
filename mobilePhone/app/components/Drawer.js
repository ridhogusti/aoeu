import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Platform, Dimensions,
  AsyncStorage,
} from 'react-native';
import { 
  Container, Content, List, ListItem, Left, Right, Text, Icon, Body,
} from 'native-base';

import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { registerScreens, registerScreenVisibilityListener } from '../screens';
import store from '../store';
// import Icon from 'react-native-vector-icons/Ionicons';
registerScreens(store, Provider); // this is where you register all of your app's screens
registerScreenVisibilityListener();

const ACCESS_TOKEN = 'access_token';
class Drawer extends React.Component {
  onShowModal = (route) => {
    this.toggleDrawer();
    this.props.navigator.showModal({
      screen: route,
      title: 'Modal',
    });
  };

  onPushToFirstTab = () => {
    this.toggleDrawer();
    this.props.navigator.handleDeepLink({
      link: 'tab1/example.Types.Push',
    });
  };

  onLogout() {
    this.deleteToken();
  }

  loadLogin() {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'Login',
      },
    });
  }
  toggleDrawer = () => {
    this.props.navigator.toggleDrawer({
      side: 'left',
    });
  };

  async deleteToken() {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      this.loadLogin();
    } catch (error) {
      console.log('Something went wrong');
    }
  }

  render() {
    const datas = [
      {
        name: 'Profile',
        route: 'Profile',
        icon: 'home',
      },
      {
        name: 'Mata Pelajaran',
        route: 'MataPelajaran',
        icon: 'home',
      },
      {
        name: 'Ubah Password',
        route: 'UbahPassword',
        icon: 'home',
      },
      {
        name: 'Jadwal Mata Pelajaran',
        route: 'JMPelajaran',
        icon: 'home',
      },
    ];
    return (
      <Container>
        <Content
          style={{ flex: 1, backgroundColor: '#fff', top: -1 }}
        >
          <Image
            style={styles.drawerCover}
            source={{ uri: 'https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/img/drawer-cover.png' }}
          >
            <Image
              style={styles.drawerImage}
              source={{ uri: 'https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/img/logo-kitchen-sink.png' }}
            />
          </Image>
          <List
            dataArray={datas}
            renderRow={data =>
              (<ListItem icon>
                <Left>
                  <Icon name={data.icon} />
                </Left>
                <Body>
                  <TouchableOpacity
                    onPress={() => this.onShowModal(data.route)}                   
                  >
                    <Text>{data.name}</Text>
                  </TouchableOpacity>
                </Body>
                <Right />
              </ListItem>)
            }
          />
          <List>
            <ListItem icon>
              <Left>
                <Icon name="home" />
              </Left>
              <Body>
                <TouchableOpacity
                  onPress={() => this.onLogout()}
                >
                  <Text>Logout</Text>
                </TouchableOpacity>
              </Body>
              <Right />
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  drawerCover: {
    alignSelf: 'stretch',
    height: deviceHeight / 3.5,
    width: null,
    position: 'relative',
    marginBottom: 10,
  },
  drawerImage: {
    position: 'absolute',
    // left: (Platform.OS === 'android') ? 30 : 40,
    left: Platform.OS === 'android' ? deviceWidth / 10 : deviceWidth / 9,
    // top: (Platform.OS === 'android') ? 45 : 55,
    top: Platform.OS === 'android' ? deviceHeight / 13 : deviceHeight / 12,
    width: 210,
    height: 75,
    resizeMode: 'cover',
  },
});

export default Drawer;
