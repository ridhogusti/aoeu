import {
  FETCH_JADWAL,
} from '../actions/jadwal';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_JADWAL:
      return { 
        ...state,
        ...action.data.data,
      };
    default:
      return state;
  }
};
