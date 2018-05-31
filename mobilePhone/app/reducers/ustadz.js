import {
  FETCH_USTADZS,
  LIMIT_USTADZS,
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
    case LIMIT_USTADZS:
      return {
        ...state,
        data: [...state.data, ...action.IsData],
      };
    default:
      return state;
  }
};
