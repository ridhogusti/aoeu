import React, { Component } from 'react';
import { 
  View,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

export default class Login extends Component {
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
        // this.setState({ logint: true });
        // this.verifyToken(accessToken);
        this.loadTab();
      } else {
        this.loadSingle();
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
      const response = await fetch('https://afternoon-beyond-22141.herokuapp.com/api/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session: {
            email: this.state.email,
            password: this.state.password,
          },
        }),
      });
      const res = await response.text();
      console.log(res);
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
    // let load;
    // if (this.state.logint) {
    //   this.loadTab();
    // } else {
    //   this.loadSingle();
    // }
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

