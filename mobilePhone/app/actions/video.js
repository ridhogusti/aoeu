import axios from 'axios';
import RNFetchBlob from 'react-native-fetch-blob';
import { 
  Platform,
} from 'react-native';
// import ArtikelApi from '../utils/api/artikelApi';

export const FETCH_VIDEOS = 'FETCH_VIDEOS';
export const FETCH_VIDEOS_USTADZ = 'FETCH_VIDEOS_USTADZ';
export const FETCH_VIDEOS_ALL_USTADZ = 'FETCH_VIDEOS_ALL_USTADZ';
export const FETCH_ALL_VIDEOS = 'FETCH_ALL_VIDEOS';
export const FETCH_VIDEO = 'FETCH_VIDEO';
export const COUNT_VIDEO = 'COUNT_VIDEO';
export const COUNT_VIDEO_USTADZ = 'COUNT_VIDEO_USTADZ';

export const LIMIT_VIDEO = 'LIMIT_VIDEO';

export const CREATE_VIDEO = 'CREATE_VIDEO';

export const UPDATE_VIDEO = 'UPDATE_VIDEO';

export const DELETED_VIDEO = 'DELETED_VIDEO';

export const SEARCH_ARTIKEL = 'SEARCH_ARTIKEL';
export const SEARCH_ARTIKEL_SUCCESS = 'SEARCH_ARTIKEL_SUCCESS';

export function getCountVideoUstadz(args) {
  if (Platform.OS === 'ios') {
    console.log(args, 'dari action video');
    return dispatch => axios.get(`http://localhost:3000/videos/${args}/count`)
      .then(data => dispatch({ type: COUNT_VIDEO_USTADZ, data }));
  }
  console.log(args, 'dari action video');
  return dispatch => axios.get(`http://10.0.3.2:3000/videos/${args}/count`)
    .then(data => dispatch({ type: COUNT_VIDEO_USTADZ, data }));
}
export function getCountVideo(args) {
  if (Platform.OS === 'ios') {
    console.log(args, 'dari action video');
    return dispatch => axios.get(`http://localhost:3000/videos/${args}/count`)
      .then(data => dispatch({ type: COUNT_VIDEO, data }));
  }
  console.log(args, 'dari action video');
  return dispatch => axios.get(`http://10.0.3.2:3000/videos/${args}/count`)
    .then(data => dispatch({ type: COUNT_VIDEO, data }));
}
export function fetchVideos(args) {
  if (Platform.OS === 'ios') {
    console.log(args, 'dari action artikel');
    return dispatch => axios.get(`http://localhost:3000/videos/${args}`)
      .then(data => dispatch({ type: FETCH_VIDEOS, data })); 
  }
  console.log(args, 'dari action artikel');
  return dispatch => axios.get(`http://10.0.3.2:3000/videos/${args}`)
    .then(data => dispatch({ type: FETCH_VIDEOS, data }));
}

export function fetchVideosUstdaz(args) {
  if (Platform.OS === 'ios') {
    console.log(args, 'dari action artikel');
    return dispatch => axios.get(`http://localhost:3000/videos/${args}`)
      .then(data => dispatch({ type: FETCH_VIDEOS_USTADZ, data }));
  }
  console.log(args, 'dari action artikel');
  return dispatch => axios.get(`http://10.0.3.2:3000/videos/${args}`)
    .then(data => dispatch({ type: FETCH_VIDEOS_USTADZ, data }));
}

export function fetchAllVideos() {
  if (Platform.OS === 'ios') {
    console.log('dati video');
    return dispatch => axios.get('http://localhost:3000/videos/')
      .then(data => dispatch({ type: FETCH_ALL_VIDEOS, data })); 
  }
  console.log('dati video');
  return dispatch => axios.get('http://10.0.3.2:3000/videos/')
    .then(data => dispatch({ type: FETCH_ALL_VIDEOS, data }));
}
export function fetchAllVideosUstadz(args) {
  if (Platform.OS === 'ios') {
    console.log(args, 'dari fetch videa ustadz');
    return dispatch => axios.get(`http://localhost:3000/videos/${args}`)
      .then(data => dispatch({ type: FETCH_VIDEOS_ALL_USTADZ, data })); 
  }
  console.log(args, 'dari fetch videa ustadz');
  return dispatch => axios.get(`http://10.0.3.2:3000/videos/${args}`)
    .then(data => dispatch({ type: FETCH_VIDEOS_ALL_USTADZ, data }));
}

export function fetchVideo(args) {
  if (Platform.OS === 'ios') {
    return dispatch => axios.get(`http://localhost:3000/videos/ambil/${args}`)
      .then(data => dispatch({ type: FETCH_VIDEO, data }));
  }
  return dispatch => axios.get(`http://10.0.3.2:3000/videos/ambil/${args}`)
    .then(data => dispatch({ type: FETCH_VIDEO, data }));
}
export function createVideo(token, title, video, dataVideo) {
  if (Platform.OS === 'ios') {
    console.log(token, title, video, dataVideo, 'dari action video');
    return dispatch => RNFetchBlob.fetch('POST', 'http://localhost:3000/videos', {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    }, [
      { name: 'title', data: title },
      { name: 'video', filename: video, type: 'video/mp4', data: RNFetchBlob.wrap(dataVideo) },
    ])
      .then(res => {
        console.log(JSON.parse(res.data), 'respone dari create');
        const IsData = JSON.parse(res.data);
        dispatch({ type: CREATE_VIDEO, IsData });
      }
      ).catch(err => console.log(err.response, this.state.token));
  }
  console.log(token, title, video, dataVideo, 'dari action video');
  return dispatch => RNFetchBlob.fetch('POST', 'http://10.0.3.2:3000/videos', {
    Authorization: token,
    'Content-Type': 'multipart/form-data',
  }, [
    { name: 'title', data: title },
    { name: 'video', filename: video, type: 'video/mp4', data: RNFetchBlob.wrap(dataVideo) },
  ])
    .then(res => {
      console.log(JSON.parse(res.data), 'respone dari create');
      const IsData = JSON.parse(res.data);
      dispatch({ type: CREATE_VIDEO, IsData });
    }
    ).catch(err => console.log(err.response, this.state.token));
}

export function updateVideo(id, token, title, video, dataVideo) {
  if (Platform.OS === 'ios') {
    console.log(token, title, video, dataVideo, 'dari action video');
    return dispatch => RNFetchBlob.fetch('PUT', `http://10.0.3.2:3000/videos/${id}`, {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    }, [
      { name: 'title', data: title },
      { name: 'video', filename: video, type: 'video/mp4', data: RNFetchBlob.wrap(dataVideo) },
    ])
      .then(res => {
        console.log(JSON.parse(res.data), 'respone dari create');
        const IsData = JSON.parse(res.data);
        dispatch({ type: UPDATE_VIDEO, IsData });
      }
      ).catch(err => console.log(err.response, this.state.token));
  }

  console.log(token, title, video, dataVideo, 'dari action video');
  return dispatch => RNFetchBlob.fetch('PUT', `http://10.0.3.2:3000/videos/${id}`, {
    Authorization: token,
    'Content-Type': 'multipart/form-data',
  }, [
    { name: 'title', data: title },
    { name: 'video', filename: video, type: 'video/mp4', data: RNFetchBlob.wrap(dataVideo) },
  ])
    .then(res => {
      console.log(JSON.parse(res.data), 'respone dari create');
      const IsData = JSON.parse(res.data);
      dispatch({ type: UPDATE_VIDEO, IsData });
    }
    ).catch(err => console.log(err.response, this.state.token));
}

export function deleteVideo(id, token) {
  if (Platform.OS === 'ios') {
    console.log(id, 'id yang mau di delete');
    return dispatch => axios.delete(`http://localhost:3000/videos/${id}`, { headers: {
      Authorization: token,
    } }).then(res => {
      console.log(res, 'respone dari create');
      dispatch({ type: DELETED_VIDEO, id });
    }); 
  }
  console.log(id, 'id yang mau di delete');
  return dispatch => axios.delete(`http://10.0.3.2:3000/videos/${id}`, { headers: {
    Authorization: token,
  } }).then(res => {
    console.log(res, 'respone dari create');
    dispatch({ type: DELETED_VIDEO, id });
  });
}

export function limitVideoUmum(limit) {
  if (Platform.OS === 'ios') {
    console.log(limit, 'id yang mau di delete');
    return dispatch => axios.get(`http://localhost:3000/videos/${limit}/umum`).then(res => {
      console.log(res, 'respone dari create');
      const IsData = res.data;
      dispatch({ type: LIMIT_VIDEO, IsData });
    }); 
  }
  console.log(limit, 'id yang mau di delete');
  return dispatch => axios.get(`http://10.0.3.2:3000/videos/${limit}/umum`).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: LIMIT_VIDEO, IsData });
  });
}
export function limitVideo(limit, username) {
  if (Platform.OS === 'ios') {
    console.log(limit, username, 'id yang mau di delete');
    return dispatch => axios.get(`http://localhost:3000/videos/${limit}/${username}`).then(res => {
      console.log(res, 'respone dari create');
      const IsData = res.data;
      dispatch({ type: LIMIT_VIDEO, IsData });
    }); 
  }
  console.log(limit, username, 'id yang mau di delete');
  return dispatch => axios.get(`http://10.0.3.2:3000/videos/${limit}/${username}`).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: LIMIT_VIDEO, IsData });
  });
}
