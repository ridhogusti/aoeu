import axios from 'axios';

export function createEvent(event) {
  console.log(event);
  return dispatch => axios.post('http://localhost:3000/posts', event);
}
