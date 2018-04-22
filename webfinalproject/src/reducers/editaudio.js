import {
  FETCH_AUDIO,
} from '../actions/audio';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_AUDIO:
      return { 
        ...state,
        ...action.data.data,
      };
    default:
      return state;
  }
};
