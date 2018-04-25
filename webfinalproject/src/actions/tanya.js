import axios from 'axios';
// import ArtikelApi from '../utils/api/artikelApi';

export const FETCH_TANYAS = 'FETCH_TANYAS';
export const FETCH_ALL_JADWALS = 'FETCH_ALL_JADWALS';
export const FETCH_JADWAL = 'FETCH_JADWAL';

export const LIMIT_JADWAL = 'LIMIT_JADWAL';

export const CREATE_TANYA = 'CREATE_TANYA';

export const CREATE_JAWAB = 'CREATE_JAWAB';

export function fetchTanyas(username, id) {
  // console.log(args, 'dari action artikel');
  return dispatch => axios.get(`http://localhost:3000/tanya/${username}/${id}`)
    .then(data => dispatch({ type: FETCH_TANYAS, data }));
}

export function fetchJadwal(args) {
  return dispatch => axios.get(`http://localhost:3000/jadwals/ambil/${args}`)
    .then(data => dispatch({ type: FETCH_JADWAL, data }));
}
export function createTanya(tanya, username) {
  const body = {
    tanya,
    username,
  };
  console.log(body, 'uaoneh');
  return dispatch => axios.post('http://localhost:3000/tanya', body).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res;
    dispatch({ type: CREATE_TANYA, IsData });
  });
}

export function createJawab(idtanya, jawab) {
  // console.log(idtanya, jawab);
  const data = {
    idtanya,
    jawab,
  };
  console.log(data);

  return dispatch => axios.put('http://localhost:3000/tanya', data).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res;
    dispatch({ type: CREATE_JAWAB, IsData });
  });
}

export function limitJadwalUmum(limit) {
  console.log(limit, 'id yang mau di delete');
  return dispatch => axios.get(`http://localhost:3000/jadwals/${limit}/umum`).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res.data;
    dispatch({ type: LIMIT_JADWAL, IsData });
  });
}
export function limitJadwal(limit, username) {
  console.log(limit, username, 'id yang mau di delete');
  return dispatch => axios.get(`http://localhost:3000/jadwals/${limit}/${username}`).then(res => {
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
