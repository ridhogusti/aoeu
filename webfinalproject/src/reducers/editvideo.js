import {
  FETCH_VIDEO,
} from '../actions/video';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_VIDEO:
      return { 
        ...state,
        ...action.data.data,
      };
    default:
      return state;
  }
};
