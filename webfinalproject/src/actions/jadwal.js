import axios from 'axios';
// import ArtikelApi from '../utils/api/artikelApi';

export const FETCH_JADWALS = 'FETCH_JADWALS';
export const FETCH_ALL_JADWALS = 'FETCH_ALL_JADWALS';
export const FETCH_JADWAL = 'FETCH_JADWAL';

export const LIMIT_JADWAL = 'LIMIT_JADWAL';

export const CREATE_JADWAL = 'CREATE_JADWAL';

export const UPDATE_JADWAL = 'UPDATE_JADWAL';

export const DELETED_JADWAL = 'DELETED_JADWAL';

export const SEARCH_ARTIKEL = 'SEARCH_ARTIKEL';
export const SEARCH_ARTIKEL_SUCCESS = 'SEARCH_ARTIKEL_SUCCESS';

export function fetchJadwals(args) {
  console.log(args, 'dari action artikel');
  return dispatch => axios.get(`http://maridakwah.com:3000/jadwals/${args}`)
    .then(data => dispatch({ type: FETCH_JADWALS, data }));
}

export function fetchAllJadwals() {
  return dispatch => axios.get('http://maridakwah.com:3000/jadwals/')
    .then(data => dispatch({ type: FETCH_ALL_JADWALS, data }));
}

export function fetchJadwal(args) {
  return dispatch => axios.get(`http://maridakwah.com:3000/jadwals/ambil/${args}`)
    .then(data => dispatch({ type: FETCH_JADWAL, data }));
}
export function createJadwal(data) {
  return dispatch => axios.post('http://maridakwah.com:3000/jadwals', data).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: CREATE_JADWAL, IsData });
  });
}

export function updateJadwal(data) {
  return dispatch => axios.put(`http://maridakwah.com:3000/jadwals/${data.get('_id')}`, data).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: UPDATE_JADWAL, IsData });
  });
}

export function deleteJadwal(id) {
  console.log(id, 'id yang mau di delete');
  return dispatch => axios.delete(`http://maridakwah.com:3000/jadwals/${id}`).then(res => {
    console.log(res, 'respone dari create');
    dispatch({ type: DELETED_JADWAL, id });
  });
}

export function limitJadwalUmum(limit) {
  console.log(limit, 'id yang mau di delete');
  return dispatch => axios.get(`http://maridakwah.com:3000/jadwals/${limit}/umum`).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: LIMIT_JADWAL, IsData });
  });
}
export function limitJadwal(limit, username) {
  console.log(limit, username, 'id yang mau di delete');
  return dispatch => axios.get(`http://maridakwah.com:3000/jadwals/${limit}/${username}`).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: LIMIT_JADWAL, IsData });
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
