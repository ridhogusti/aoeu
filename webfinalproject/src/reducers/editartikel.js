import {
  FETCH_ARTIKEL,
} from '../actions/artikel';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ARTIKEL:
      return { 
        ...state,
        ...action.data.data,
      };
    default:
      return state;
  }
};
