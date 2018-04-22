import axios from 'axios';
// import ArtikelApi from '../utils/api/artikelApi';

export const FETCH_VIDEOS = 'FETCH_VIDEOS';
export const FETCH_ALL_VIDEOS = 'FETCH_ALL_VIDEOS';
export const FETCH_VIDEO = 'FETCH_VIDEO';

export const LIMIT_VIDEO = 'LIMIT_VIDEO';

export const CREATE_VIDEO = 'CREATE_VIDEO';

export const UPDATE_VIDEO = 'UPDATE_VIDEO';

export const DELETED_VIDEO = 'DELETED_VIDEO';

export const SEARCH_ARTIKEL = 'SEARCH_ARTIKEL';
export const SEARCH_ARTIKEL_SUCCESS = 'SEARCH_ARTIKEL_SUCCESS';

export function fetchVideos(args) {
  console.log(args, 'dari action artikel');
  return dispatch => axios.get(`http://localhost:3000/videos/${args}`)
    .then(data => dispatch({ type: FETCH_VIDEOS, data }));
}

export function fetchAllVideos() {
  return dispatch => axios.get('http://localhost:3000/videos/')
    .then(data => dispatch({ type: FETCH_ALL_VIDEOS, data }));
}

export function fetchVideo(args) {
  return dispatch => axios.get(`http://localhost:3000/videos/ambil/${args}`)
    .then(data => dispatch({ type: FETCH_VIDEO, data }));
}
export function createVideo(data) {
  return dispatch => axios.post('http://localhost:3000/videos', data).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: CREATE_VIDEO, IsData });
  });
}

export function updateVideo(data) {
  return dispatch => axios.put(`http://localhost:3000/videos/${data.get('_id')}`, data).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: UPDATE_VIDEO, IsData });
  });
}

export function deleteVideo(id) {
  console.log(id, 'id yang mau di delete');
  return dispatch => axios.delete(`http://localhost:3000/videos/${id}`).then(res => {
    console.log(res, 'respone dari create');
    dispatch({ type: DELETED_VIDEO, id });
  });
}

export function limitVideoUmum(limit) {
  console.log(limit, 'id yang mau di delete');
  return dispatch => axios.get(`http://localhost:3000/videos/${limit}/umum`).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: LIMIT_VIDEO, IsData });
  });
}
export function limitVideo(limit, username) {
  console.log(limit, username, 'id yang mau di delete');
  return dispatch => axios.get(`http://localhost:3000/videos/${limit}/${username}`).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: LIMIT_VIDEO, IsData });
  });
}

// export function updatePhone(id, name, phone) {
//   return async (dispatch, getState) => {
//     const phones = {
//       _id: id,
//       name,
//       phone,
//     };
//     await dispatch({ type: UPDATE_PHONE, phones });
//     console.log(phones);

//     try {
//       await PhoneApi.updatePhone(phones);
//       return dispatch({ type: UPDATE_PHONE_SUCCESS });
//     } catch (error) {
//       return dispatch({
//         type: UPDATE_PHONE_ERROR,
//         error,
//         phones,
//       });
//     }
//   };
// }

// export function deletePhone(id) {
//   console.log(id, 'action');
//   return async (dispatch, getState) => {
//     dispatch({ type: DELETED_PHONE, id });

//     try {
//       await PhoneApi.deletedPhone(id);
//       return dispatch({ type: DELETED_PHONE_SUCCESS });
//     } catch (error) {
//       return dispatch({
//         type: DELETED_PHONE_ERROR,
//         error,
//         id,
//       });
//     }
//   };
// }

// export function searchPhone(name, phone) {
//   return async (dispatch, getState) => {
//     const phones = {
//       name,
//       phone,
//     };

//     console.log(phones);
//     dispatch({ type: SEARCH_PHONE, phones });

//     try {
//       return dispatch({ type: SEARCH_PHONE_SUCCESS });
//     } catch (error) {
//       return error;
//     }
//   };
// }
