import axios from 'axios';
import RNFetchBlob from 'react-native-fetch-blob';
import { Platform } from 'react-native';
// import ArtikelApi from '../utils/api/artikelApi';

export const FETCH_ARTIKELS = 'FETCH_ARTIKELS';
export const FETCH_ALL_ARTIKELS = 'FETCH_ALL_ARTIKELS';
export const FETCH_ARTIKEL = 'FETCH_ARTIKEL';
export const COUNT_ARTIKEL = 'COUNT_ARTIKEL';
export const COUNT_ARTIKEL_USTADZ = 'COUNT_ARTIKEL_USTADZ';

export const LIMIT_ARTIKEL = 'LIMIT_ARTIKEL';
export const LIMIT_ARTIKEL_USTADZ = 'LIMIT_ARTIKEL_USTADZ';

export const CREATE_ARTIKEL = 'CREATE_ARTIKEL';

export const UPDATE_ARTIKEL = 'UPDATE_ARTIKEL';

export const DELETED_ARTIKEL = 'DELETED_ARTIKEL';

export const SEARCH_ARTIKEL = 'SEARCH_ARTIKEL';
export const SEARCH_ARTIKEL_SUCCESS = 'SEARCH_ARTIKEL_SUCCESS';

export function getCountArtikel(args) {
  console.log(args, 'dari action artikel');
  if (Platform.OS === 'ios') {
    return dispatch => axios.get(`http://localhost:3000/artikels/${args}/count`)
      .then(data => dispatch({ type: COUNT_ARTIKEL, data }));
  } 
    
  return dispatch => axios.get(`http://10.0.3.2:3000/artikels/${args}/count`)
    .then(data => dispatch({ type: COUNT_ARTIKEL, data }));
}
export function getCountArtikelUstadz(args) {
  if (Platform.OS === 'ios') {
    console.log(args, 'dari get count artikel');
    return dispatch => axios.get(`http://localhost:3000/artikels/${args}/count`)
      .then(data => dispatch({ type: COUNT_ARTIKEL_USTADZ, data }));
  } 
    
  console.log(args, 'dari get count artikel');
  return dispatch => axios.get(`http://10.0.3.2:3000/artikels/${args}/count`)
    .then(data => dispatch({ type: COUNT_ARTIKEL_USTADZ, data }));
}
export function fetchArtikels(args) {
  if (Platform.OS === 'ios') {
    console.log(args, 'dari action artikel');
    return dispatch => axios.get(`http://localhost:3000/artikels/${args}`)
      .then(data => dispatch({ type: FETCH_ARTIKELS, data }));
  }
  console.log(args, 'dari action artikel');
  return dispatch => axios.get(`http://10.0.3.2:3000/artikels/${args}`)
    .then(data => dispatch({ type: FETCH_ARTIKELS, data }));
}

export function fetchAllArtikels() {
  if (Platform.OS === 'ios') {
    console.log('test fetch');
    return dispatch => axios.get('http://localhost:3000/artikels/')
      .then(data => dispatch({ type: FETCH_ALL_ARTIKELS, data }));
  }
  console.log('test fetch');
  return dispatch => axios.get('http://10.0.3.2:3000/artikels/')
    .then(data => dispatch({ type: FETCH_ALL_ARTIKELS, data }));
}

export function fetchArtikel(args) {
  if (Platform.OS === 'ios') {
    return dispatch => axios.get(`http://localhost:3000/artikels/ambil/${args}`)
      .then(data => dispatch({ type: FETCH_ARTIKEL, data }));
  }
  return dispatch => axios.get(`http://10.0.3.2:3000/artikels/ambil/${args}`)
    .then(data => dispatch({ type: FETCH_ARTIKEL, data }));
}
export function createArtikel(token, title, text, image, dataImage) {
  if (Platform.OS === 'ios') {
    return dispatch => RNFetchBlob.fetch('POST', 'http://localhost:3000/artikels', {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    }, [
      { name: 'title', data: title },
      { name: 'text', data: text },
      { name: 'image', filename: image, data: RNFetchBlob.wrap(dataImage) },
    ])
      .then(res => {
        console.log(JSON.parse(res.data), 'respone dari create');
        const IsData = JSON.parse(res.data);
        dispatch({ type: CREATE_ARTIKEL, IsData });
      }
      ).catch(err => console.log(err.response, this.state.token));
  }
  return dispatch => RNFetchBlob.fetch('POST', 'http://10.0.3.2:3000/artikels', {
    Authorization: token,
    'Content-Type': 'multipart/form-data',
  }, [
    { name: 'title', data: title },
    { name: 'text', data: text },
    { name: 'image', filename: image, data: RNFetchBlob.wrap(dataImage) },
  ])
    .then(res => {
      console.log(JSON.parse(res.data), 'respone dari create');
      const IsData = JSON.parse(res.data);
      dispatch({ type: CREATE_ARTIKEL, IsData });
    }
    ).catch(err => console.log(err.response, this.state.token));
}

export function updateArtikel(id, token, title, text, image, dataImage) {
  if (Platform.OS === 'ios') {
    return dispatch => RNFetchBlob.fetch('PUT', `http://localhost:3000/artikels/${id}`, {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    }, [
      { name: 'title', data: title },
      { name: 'text', data: text },
      { name: 'image', filename: image, data: RNFetchBlob.wrap(dataImage) },
    ])
      .then(res => {
        console.log(JSON.parse(res.data), 'respone dari create');
        const IsData = JSON.parse(res.data);
        dispatch({ type: UPDATE_ARTIKEL, IsData });
      }
      ).catch(err => console.log(err.response, this.state.token));
  // return dispatch => axios.put(`http://localhost:3000/artikels/${data.get('_id')}`, data).then(res => {
  //   console.log(res, 'respone dari create');
  //   const IsData = res.data;
  //   dispatch({ type: UPDATE_ARTIKEL, IsData });
  // });
  }
  return dispatch => RNFetchBlob.fetch('PUT', `http://10.0.3.2:3000/artikels/${id}`, {
    Authorization: token,
    'Content-Type': 'multipart/form-data',
  }, [
    { name: 'title', data: title },
    { name: 'text', data: text },
    { name: 'image', filename: image, data: RNFetchBlob.wrap(dataImage) },
  ])
    .then(res => {
      console.log(JSON.parse(res.data), 'respone dari create');
      const IsData = JSON.parse(res.data);
      dispatch({ type: UPDATE_ARTIKEL, IsData });
    }
    ).catch(err => console.log(err.response, this.state.token));
}

export function deleteArtikel(id, token) {
  if (Platform.OS === 'ios') {
    console.log(id, 'id yang mau di delete');
    return dispatch => axios.delete(`http://localhost:3000/artikels/${id}`, { headers: {
      Authorization: token,
    } }).then(res => {
      console.log(res, 'respone dari create');
      dispatch({ type: DELETED_ARTIKEL, id });
    });
  }
  console.log(id, 'id yang mau di delete');
  return dispatch => axios.delete(`http://10.0.3.2:3000/artikels/${id}`, { headers: {
    Authorization: token,
  } }).then(res => {
    console.log(res, 'respone dari create');
    dispatch({ type: DELETED_ARTIKEL, id });
  });
}

export function limitArtikelUmum(limit) {
  if (Platform.OS === 'ios') {
    console.log(limit, 'id yang mau di delete');
    return dispatch => axios.get(`http://localhost:3000/artikels/${limit}/umum`).then(res => {
      console.log(res, 'respone dari create');
      const IsData = res.data;
      dispatch({ type: LIMIT_ARTIKEL, IsData });
    });
  }
  console.log(limit, 'id yang mau di delete');
  return dispatch => axios.get(`http://10.0.3.2:3000/artikels/${limit}/umum`).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: LIMIT_ARTIKEL, IsData });
  });
}
export function limitArtikel(limit, username) {
  if (Platform.OS === 'ios') {
    console.log(limit, username, 'id yang mau di delete');
    return dispatch => axios.get(`http://localhost:3000/artikels/${limit}/${username}`).then(res => {
      console.log(res, 'respone dari create');
      const IsData = res.data;
      dispatch({ type: LIMIT_ARTIKEL_USTADZ, IsData });
    });
  }
  console.log(limit, username, 'id yang mau di delete');
  return dispatch => axios.get(`http://10.0.3.2:3000/artikels/${limit}/${username}`).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: LIMIT_ARTIKEL_USTADZ, IsData });
  });
}
