import {
  COUNT_ARTIKEL_USTADZ,
} from '../actions/artikel';

const initialState = {
  data: [],
  error: null,
  isFetched: false,
  jumlahDelete: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COUNT_ARTIKEL_USTADZ:
      return { 
        data: action.data,
      };
    default:
      return state;
  }
};
