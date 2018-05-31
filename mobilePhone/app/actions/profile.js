import axios from 'axios';

export function getDataDiri(token) {
  return {
    type: 'GET_DATA_DIRI',
    payload: axios.get(`http://pantausiswa.xyz/api/ambilsiswa/datasiswa?token=${token}`),
  };
}
