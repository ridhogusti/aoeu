import axios from 'axios';
// import ArtikelApi from '../utils/api/artikelApi';

// export const FETCH_TENTANGS = 'FETCH_TENTANGS';
// export const FETCH_ALL_TENTANGS = 'FETCH_ALL_TENTANGS';
export const FETCH_TENTANG = 'FETCH_TENTANG';

// export const LIMIT_TENTANG = 'LIMIT_TENTANG';

// export const CREATE_TENTANG = 'CREATE_TENTANG';

export const UPDATE_TENTANG = 'UPDATE_TENTANG';
export const UPDATE_PENDIDKAN = 'UPDATE_PENDIDKAN';
export const UPDATE_PEKERJAAN = 'UPDATE_PEKERJAAN';

export const DELETED_PENDIDIKAN = 'DELETED_PENDIDIKAN';
export const DELETED_PEKERJAAN = 'DELETED_PEKERJAAN';

// export const SEARCH_ARTIKEL = 'SEARCH_ARTIKEL';
// export const SEARCH_ARTIKEL_SUCCESS = 'SEARCH_ARTIKEL_SUCCESS';

export function fetchTentang(args) {
  return dispatch => axios.get(`http://localhost:3000/tentang/${args}`)
    .then(data => {
      console.log(data);
      dispatch({ type: FETCH_TENTANG, data });
    });
}

export function updateTentang(data) {
  console.log(data);
  return dispatch => axios.put('http://localhost:3000/tentang/', data).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res;
    dispatch({ type: UPDATE_TENTANG, IsData });
  });
}

export function updatePendidikan(id, data) {
  const dataa = {
    pendidikan: data,
  };
  return dispatch => axios.put(`http://localhost:3000/tentang/pendidikan/${id}`, dataa).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res;
    dispatch({ type: UPDATE_PENDIDKAN, IsData });
  });
}

export function updatePekerjaan(id, data) {
  const dataa = {
    pekerjaan: data,
  };
  console.log(id, dataa, 'reducer');
  return dispatch => axios.put(`http://localhost:3000/tentang/pekerjaan/${id}`, dataa).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res;
    dispatch({ type: UPDATE_PEKERJAAN, IsData });
  });
}
export function deletePekerjaan(id) {
  console.log(id, 'id yang mau di delete');
  return dispatch => axios.delete(`http://localhost:3000/tentang/pekerjaan/${id}`).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res;
    dispatch({ type: DELETED_PEKERJAAN, IsData });
  });
}
export function deletePendidikan(id) {
  console.log(id, 'id yang mau di delete');
  return dispatch => axios.delete(`http://localhost:3000/tentang/pendidikan/${id}`).then(res => {
    console.log(res, 'respone dari create');
    const IsData = res;
    dispatch({ type: DELETED_PENDIDIKAN, IsData });
  });
}

