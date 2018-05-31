import jwtDecode from 'jwt-decode';
import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user, datauser) {
  return {
    type: SET_CURRENT_USER,
    user,
    datauser,
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

export function login(data) {
  return dispatch => axios.post('http://maridakwah.com:3000/users/login', data).then(res => {
    const token = res.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwtDecode(token), res.data));
  });
}
