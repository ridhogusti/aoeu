import axios from 'axios';

export function userSignupRequest(userData) {
  console.log(userData);
  return dispatch => axios.post('http://localhost:3000/users/signup', userData);
  // return dispatch => fetch('http://localhost:3000/users/signup', {
  //   mode: 'no-cors',
  //   method: 'POST',
  //   body: userData,
  // });
}

export function isUserExists(identifier) {
  return dispatch => axios.get(`/api/users/${identifier}`);
}
