import axios from 'axios';

export function createEvent(event) {
  console.log(event);
  return dispatch => axios.post('http://maridakwah.com:3000/posts', event);
}
