import {
  FETCH_AUDIOS,
} from '../actions/audio';

const initialState = {
  data: [],
  error: null,
  isFetched: false,
  jumlahDelete: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AUDIOS:
      return { 
        ...state,
        data: action.data.data,
      };
    default:
      return state;
  }
};
