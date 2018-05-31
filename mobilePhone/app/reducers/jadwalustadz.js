import {
  FETCH_JADWALS,
} from '../actions/jadwal';

const initialState = {
  data: [],
  error: null,
  isFetched: false,
  jumlahDelete: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JADWALS:
      return { 
        ...state,
        data: action.data.data,
      };
    default:
      return state;
  }
};
