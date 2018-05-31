import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { AsyncStorage, Platform } from 'react-native';
import SyncStorage from 'sync-storage';
import setAuthorizationToken from '../setAuthorizationToken';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export function setCurrentUser(user, datauser) {
  return {
    type: SET_CURRENT_USER,
    user,
    datauser,
  };
}

export function getStorage() {
  return dispatch => AsyncStorage.getItem('jwtToken').then(val => {
    console.log(val, 'dari actions');
    dispatch(setCurrentUser(jwtDecode(val), val));
  });
}

export function login(data) {
  if (Platform.OS === 'ios') {
    return dispatch => axios.post('http://localhost:3000/users/login', data).then(res => {
      const token = res.data.token;
      console.log(token, 'ini di actions auth');
      SyncStorage.set('jwtToken', token);

      // AsyncStorage.setItem('jwtToken', token, (err) => {
      //   if (err) {
      //     console.log('an error');
      //     throw err;
      //   }
      //   console.log('success');
      // }).catch((err) => {
      //   console.log(`error is: ${err}`);
      // });
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token), res.data));
    });
  } 
    
  return dispatch => axios.post('http://10.0.3.2:3000/users/login', data).then(res => {
    const token = res.data.token;
    console.log(token, 'ini di actions auth');
    SyncStorage.set('jwtToken', token);

    // AsyncStorage.setItem('jwtToken', token, (err) => {
    //   if (err) {
    //     console.log('an error');
    //     throw err;
    //   }
    //   console.log('success');
    // }).catch((err) => {
    //   console.log(`error is: ${err}`);
    // });
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwtDecode(token), res.data));
  });
}
