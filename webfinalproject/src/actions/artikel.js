import axios from 'axios';
// import ArtikelApi from '../utils/api/artikelApi';

export const FETCH_ARTIKELS = 'FETCH_ARTIKELS';
export const FETCH_ALL_ARTIKELS = 'FETCH_ALL_ARTIKELS';
export const FETCH_ARTIKEL = 'FETCH_ARTIKEL';
export const COUNT_ARTIKEL = 'COUNT_ARTIKEL';

export const LIMIT_ARTIKEL = 'LIMIT_ARTIKEL';

export const CREATE_ARTIKEL = 'CREATE_ARTIKEL';

export const UPDATE_ARTIKEL = 'UPDATE_ARTIKEL';

export const DELETED_ARTIKEL = 'DELETED_ARTIKEL';

export const SEARCH_ARTIKEL = 'SEARCH_ARTIKEL';
export const SEARCH_ARTIKEL_SUCCESS = 'SEARCH_ARTIKEL_SUCCESS';

export function getCountArtikel(args) {
  console.log(args, 'dari action artikel');
  return dispatch => axios.get(`http://maridakwah:3000/artikels/${args}/count`)
    .then(data => dispatch({ type: COUNT_ARTIKEL, data }));
}
export function fetchArtikels(args) {
  console.log(args, 'dari action artikel');
  return dispatch => axios.get(`http://maridakwah:3000/artikels/${args}`)
    .then(data => dispatch({ type: FETCH_ARTIKELS, data }));
}

export function fetchAllArtikels() {
  return dispatch => axios.get('http://maridakwah:3000/artikels/')
    .then(data => dispatch({ type: FETCH_ALL_ARTIKELS, data }));
}

export function fetchArtikel(args) {
  return dispatch => axios.get(`http://maridakwah:3000/artikels/ambil/${args}`)
    .then(data => dispatch({ type: FETCH_ARTIKEL, data }));
}
export function createArtikel(data) {
  return dispatch => axios.post('http://maridakwah:3000/artikels', data).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: CREATE_ARTIKEL, IsData });
  });
}

export function updateArtikel(data) {
  return dispatch => axios.put(`http://maridakwah:3000/artikels/${data.get('_id')}`, data).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: UPDATE_ARTIKEL, IsData });
  });
}

export function deleteArtikel(id) {
  console.log(id, 'id yang mau di delete');
  return dispatch => axios.delete(`http://maridakwah:3000/artikels/${id}`).then(res => {
    console.log(res, 'respone dari create');
    dispatch({ type: DELETED_ARTIKEL, id });
  });
}

export function limitArtikelUmum(limit) {
  console.log(limit, 'id yang mau di delete');
  return dispatch => axios.get(`http://maridakwah:3000/artikels/${limit}/umum`).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: LIMIT_ARTIKEL, IsData });
  });
}
export function limitArtikel(limit, username) {
  console.log(limit, username, 'id yang mau di delete');
  return dispatch => axios.get(`http://maridakwah:3000/artikels/${limit}/${username}`).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: LIMIT_ARTIKEL, IsData });
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
