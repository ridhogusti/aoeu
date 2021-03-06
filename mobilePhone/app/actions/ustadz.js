import axios from 'axios';
import { 
  Platform,
} from 'react-native';

export const FETCH_USTADZS = 'FETCH_USTADZS';
export const LIMIT_USTADZS = 'LIMIT_USTADZS';

export function fetchUstadzs() {
  if (Platform.OS === 'ios') {
    return dispatch => axios.get('http://localhost:3000/users/ustadz')
      .then(data => dispatch({ type: FETCH_USTADZS, data }));
  // .then(data => console.log(data));
  }
  return dispatch => axios.get('http://10.0.3.2:3000/users/ustadz')
    .then(data => dispatch({ type: FETCH_USTADZS, data }));
  // .then(data => console.log(data));
}

export function limitUstadz(limit) {
  console.log(limit, 'id yang mau di delete');
  return dispatch => axios.get(`http://localhost:3000/users/${limit}/umum`).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: LIMIT_USTADZS, IsData });
  });
}
