import {
  COUNT_VIDEO,
} from '../actions/video';

const initialState = {
  data: [],
  error: null,
  isFetched: false,
  jumlahDelete: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COUNT_VIDEO:
      return { 
        data: action.data,
      };
    default:
      return state;
  }
};
