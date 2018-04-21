import axios from 'axios';

export const FETCH_USTADZS = 'FETCH_USTADZS';

export function fetchUstadzs() {
  console.log(localStorage.getItem('username'), 'username ustadz');
  return dispatch => axios.get('http://localhost:3000/users/ustadz')
    .then(data => dispatch({ type: FETCH_USTADZS, data }));
  // .then(data => console.log(data));
}
