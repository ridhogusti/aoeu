import axios from 'axios';
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
  console.log(args, 'dari action artikel');
  return dispatch => axios.get(`http://localhost:3000/audios/${args}`)
    .then(data => dispatch({ type: FETCH_AUDIOS, data }));
}

export function fetchAllAudios() {
  return dispatch => axios.get('http://localhost:3000/audios/')
    .then(data => dispatch({ type: FETCH_ALL_AUDIOS, data }));
}

export function fetchAudio(args) {
  return dispatch => axios.get(`http://localhost:3000/audios/ambil/${args}`)
    .then(data => dispatch({ type: FETCH_AUDIO, data }));
}
export function createAudio(data) {
  return dispatch => axios.post('http://localhost:3000/audios', data).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: CREATE_AUDIO, IsData });
  });
}

export function updateAudio(data) {
  return dispatch => axios.put(`http://localhost:3000/audios/${data.get('_id')}`, data).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: UPDATE_AUDIO, IsData });
  });
}

export function deleteAudio(id) {
  console.log(id, 'id yang mau di delete');
  return dispatch => axios.delete(`http://localhost:3000/audios/${id}`).then(res => {
    console.log(res, 'respone dari create');
    dispatch({ type: DELETED_AUDIO, id });
  });
}

export function limitAudioUmum(limit) {
  console.log(limit, 'id yang mau di delete');
  return dispatch => axios.get(`http://localhost:3000/audios/${limit}/umum`).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: LIMIT_AUDIO, IsData });
  });
}
export function limitAudio(limit, username) {
  console.log(limit, username, 'id yang mau di delete');
  return dispatch => axios.get(`http://localhost:3000/audios/${limit}/${username}`).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: LIMIT_AUDIO, IsData });
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
