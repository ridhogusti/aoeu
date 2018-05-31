import axios from 'axios';
import { 
  Platform,
} from 'react-native';
// import ArtikelApi from '../utils/api/artikelApi';

export const FETCH_AUDIOS = 'FETCH_AUDIOS';
export const FETCH_ALL_AUDIOS = 'FETCH_ALL_AUDIOS';
export const FETCH_AUDIO = 'FETCH_AUDIO';

export const LIMIT_AUDIO = 'LIMIT_AUDIO';

export const CREATE_AUDIO = 'CREATE_AUDIO';

export const UPDATE_AUDIO = 'UPDATE_AUDIO';

export const DELETED_AUDIO = 'DELETED_AUDIO';

export const SEARCH_ARTIKEL = 'SEARCH_ARTIKEL';
export const SEARCH_ARTIKEL_SUCCESS = 'SEARCH_ARTIKEL_SUCCESS';

export function fetchAudios(args) {
  if (Platform.OS === 'ios') {
    console.log(args, 'dari action artikel');
    return dispatch => axios.get(`http://localhost:3000/audios/${args}`)
      .then(data => dispatch({ type: FETCH_AUDIOS, data }));
  }
  console.log(args, 'dari action artikel');
  return dispatch => axios.get(`http://10.0.3.2:3000/audios/${args}`)
    .then(data => dispatch({ type: FETCH_AUDIOS, data }));
}

export function fetchAllAudios() {
  if (Platform.OS === 'ios') {
    return dispatch => axios.get('http://localhost:3000/audios/')
      .then(data => dispatch({ type: FETCH_ALL_AUDIOS, data }));
  }
  return dispatch => axios.get('http://10.0.3.2:3000/audios/')
    .then(data => dispatch({ type: FETCH_ALL_AUDIOS, data }));
}

export function fetchAudio(args) {
  if (Platform.OS === 'ios') {
    return dispatch => axios.get(`http://localhost:3000/audios/ambil/${args}`)
      .then(data => dispatch({ type: FETCH_AUDIO, data }));
  }
  return dispatch => axios.get(`http://10.0.3.2:3000/audios/ambil/${args}`)
    .then(data => dispatch({ type: FETCH_AUDIO, data }));
}
export function createAudio(data) {
  if (Platform.OS === 'ios') {
    return dispatch => axios.post('http://localhost:3000/audios', data).then(res => {
      console.log(res, 'respone dari create');
      const IsData = res.data;
      dispatch({ type: CREATE_AUDIO, IsData });
    });
  }
  return dispatch => axios.post('http://10.0.3.2:3000/audios', data).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: CREATE_AUDIO, IsData });
  });
}

export function updateAudio(data) {
  if (Platform.OS === 'ios') {
    return dispatch => axios.put(`http://localhost:3000/audios/${data.get('_id')}`, data).then(res => {
      console.log(res, 'respone dari create');
      const IsData = res.data;
      dispatch({ type: UPDATE_AUDIO, IsData });
    });
  }
  return dispatch => axios.put(`http://10.0.3.2:3000/audios/${data.get('_id')}`, data).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: UPDATE_AUDIO, IsData });
  });
}

export function deleteAudio(id) {
  if (Platform.OS === 'ios') {
    console.log(id, 'id yang mau di delete');
    return dispatch => axios.delete(`http://localhost:3000/audios/${id}`).then(res => {
      console.log(res, 'respone dari create');
      dispatch({ type: DELETED_AUDIO, id });
    });
  }
  console.log(id, 'id yang mau di delete');
  return dispatch => axios.delete(`http://10.0.3.2:3000/audios/${id}`).then(res => {
    console.log(res, 'respone dari create');
    dispatch({ type: DELETED_AUDIO, id });
  });
}

export function limitAudioUmum(limit) {
  if (Platform.OS === 'ios') {
    console.log(limit, 'id yang mau di delete');
    return dispatch => axios.get(`http://localhost:3000/audios/${limit}/umum`).then(res => {
      console.log(res, 'respone dari create');
      const IsData = res.data;
      dispatch({ type: LIMIT_AUDIO, IsData });
    });
  }
  console.log(limit, 'id yang mau di delete');
  return dispatch => axios.get(`http://10.0.3.2:3000/audios/${limit}/umum`).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: LIMIT_AUDIO, IsData });
  });
}
export function limitAudio(limit, username) {
  if (Platform.OS === 'ios') {
    console.log(limit, username, 'id yang mau di delete');
    return dispatch => axios.get(`http://localhost:3000/audios/${limit}/${username}`).then(res => {
      console.log(res, 'respone dari create');
      const IsData = res.data;
      dispatch({ type: LIMIT_AUDIO, IsData });
    });
  }
  console.log(limit, username, 'id yang mau di delete');
  return dispatch => axios.get(`http://10.0.3.2:3000/audios/${limit}/${username}`).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: LIMIT_AUDIO, IsData });
  });
}
