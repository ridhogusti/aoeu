import React, { Component } from 'react';
import { 
  View,
  AsyncStorage,
} from 'react-native';
import { Container, Button, Text, H3 } from 'native-base';

import { Provider } from 'react-redux';
import { registerScreens, registerScreenVisibilityListener } from '../screens';
import store from '../store';
// import Icon from 'react-native-vector-icons/Ionicons';
registerScreens(store, Provider); // this is where you register all of your app's screens
registerScreenVisibilityListener();

const ACCESS_TOKEN = 'access_token';

export default class Loginn extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: 'blue',
    navBarHidden: true,
  }
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: '',
      showProgress: false,
      logint: false,
    };
  }

  //   componentWillMount() {
  //     this.getToken();
  //   }

  componentDidMount() {
    this.getToken();
  }
  async getToken() {
    try {
      const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log(accessToken);
      if (accessToken) {
        this.setState({ logint: true });
        // this.loadTab();
        this.verifyToken(accessToken);
      } else {
        console.log('Token not set');
      }
    } catch (error) {
      console.log('Something went wrong');
    }
  }
  // If token is verified we will redirect the user to the home page
  async verifyToken(token) {
    const accessToken = token;
    
    try {
      const response = await fetch(`https://afternoon-beyond-22141.herokuapp.com/api/verify?session%5Baccess_token%5D=${accessToken}`);
      const res = await response.text();
      if (response.status >= 200 && response.status < 300) {
        // Verified token means user is logged in so we redirect him to home.
        this.setState({ logint: true });

        console.log(this.state.logint);
        console.log('object');
        // this.loadTab();
      } else {
        // Handle error
        const error = res;
        throw error;
      }
    } catch (error) {
      console.log(`error response: ${error}`);
    }
  }

  _loadInitialState = async () => {
    const value = await AsyncStorage.getItem('user');
    if (value !== null) {
      this.loadTab();
    }
  }

  storeToken(responseData) {
    AsyncStorage.setItem(ACCESS_TOKEN, responseData, (err) => {
      if (err) {
        console.log('an error');
        throw err;
      }
      console.log('success');
    }).catch((err) => {
      console.log(`error is: ${err}`);
    });
  }

  async login() {
    this.setState({ showProgress: true });
    try {
      const response = await fetch('http://pantausiswa.xyz/api/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      });
      const res = await response.text();
      if (response.status >= 200 && response.status < 300) {
        // Handle success
        const accessToken = res;
        console.log(accessToken);
        // On success we will store the access_token in the AsyncStorage
        this.storeToken(accessToken);
        this.loadTab();
      } else {
        // Handle error
        const error = res;
        throw error;
      }
    } catch (error) {
      this.setState({ error });
      console.log(`error ${error}`);
      this.setState({ showProgress: false });
    }
  }
  
  render() {
    return (
      <Container>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#009688',
          }}
        >
          <View style={{ 
            width: '100%',
            height: 50,
            justifyContent: 'center',
          }}
          />
          
          <View style={{ width: '100%', 
            justifyContent: 'center',
            height: 50,
            // backgroundColor: 'steelblue'
          }}
          >
            <H3
              style={{
                color: '#fff',
                alignSelf: 'center',
              }}
            >Selamat Datang di Mari Dakwah</H3>
            <Text
              style={{
                color: '#fff',
                alignSelf: 'center',
              }}
            >Tempatnya Berbagi Kajian</Text>
          
          </View>
          <View style={{ width: '100%', 
            justifyContent: 'center',
            height: 100,
            marginBottom: 10,
          }}
          >
            <Button
              light
              block
              rounded
              bordered
              style={{
                alignSelf: 'center',
                marginBottom: 10,
              }}
            >
              <Text>Sign Up</Text>
            </Button>
            <Button
              onPress={() => this.props.navigator.push({
                screen: 'Loginn',
                // title: 'Login',
              })}
              block
              primary
              rounded
              style={{
                alignSelf: 'center',
              }}
            >
              <Text>Login</Text>
            </Button>
          </View>
        </View>
      </Container>     
      
    );
  }
}

