import {
  FETCH_VIDEOS_USTADZ,  
} from '../actions/video';

const initialState = {
  data: [],
  error: null,
  isFetched: false,
  jumlahDelete: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIDEOS_USTADZ:
      return { 
        ...state,
        data: action.data.data,
      };
    default:
      return state;
  }
};
