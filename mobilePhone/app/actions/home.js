import axios from 'axios';

export function getBerita(token) {
  return {
    type: 'GET_BERITA',
    payload: axios.get(`http://pantausiswa.xyz/api/berita?token=${token}`),
  };
}

