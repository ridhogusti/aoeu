import {
  FETCH_VIDEOS_ALL_USTADZ,
  CREATE_VIDEO,
  UPDATE_VIDEO,
  DELETED_VIDEO,
} from '../actions/video';

const initialState = {
  data: [],
  error: null,
  isFetched: false,
  jumlahDelete: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIDEOS_ALL_USTADZ:
      return { 
        ...state,
        data: action.data.data,
      };
    case CREATE_VIDEO:
      return {
        ...state,
        data: [action.IsData, ...state.data],
        jumlahDelete: state.jumlahDelete - 1,
      };
    case UPDATE_VIDEO:
      return {
        ...state,
        data: state.data.map(item => {
          console.log(...state, 'dari map');
          if (item._id === action.IsData._id) return action.IsData;
          return item;
        }),
      };
    case DELETED_VIDEO:
      return {
        ...state,
        data: state.data.filter(item => item._id !== action.id),
        jumlahDelete: state.jumlahDelete + 1,
      };
    default:
      return state;
  }
};
