import {
  FETCH_USTADZS,
} from '../actions/ustadz';

const initialState = {
  data: [],
  error: null,
  isFetched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USTADZS:
      return { 
        ...state,
        data: action.data.data,
      };
    default:
      return state;
  }
};
