import {
  COUNT_VIDEO_USTADZ,
} from '../actions/video';

const initialState = {
  data: [],
  error: null,
  isFetched: false,
  jumlahDelete: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COUNT_VIDEO_USTADZ:
      return { 
        data: action.data,
      };
    default:
      return state;
  }
};
