import {
  FETCH_ALL_VIDEOS,
  UPDATE_VIDEO,
  DELETED_VIDEO,
  LIMIT_VIDEO,
  // CREATE_VIDEO,
} from '../actions/video';

const initialState = {
  data: [],
  error: null,
  isFetched: false,
  jumlahDelete: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_VIDEOS:
      return { 
        ...state,
        data: action.data.data,
      };
    case LIMIT_VIDEO:
      return { 
        ...state,
        data: [...state.data, ...action.IsData],
      };
    // case CREATE_VIDEO:
    //   return {
    //     ...state,
    //     data: [...state.data, action.IsData],
    //     jumlahDelete: state.jumlahDelete - 1,
    //   };
    // case UPDATE_VIDEO:
    //   return {
    //     ...state,
    //     data: state.data.map(item => {
    //       if (item._id === action.IsData._id) return action.IsData;
    //       return item;
    //     }),
    //   };

    // case UPDATE_PHONE_SUCCESS:
    //   return state;
    case DELETED_VIDEO:
      return {
        ...state,
        data: state.data.filter(item => item._id !== action.id),
        jumlahDelete: state.jumlahDelete + 1,
      };
    // case DELETED_PHONE_SUCCESS:
    //   return state;
    // case SEARCH_PHONE:
    //   console.log(...state);
    //   console.log(action.phones.name);
    //   return {
    //     // ...state,
    //     data: state.data.filter(phone => phone.name.includes('Ridho')),
    //   };
    // case SEARCH_PHONE_SUCCESS:
    //   return state;
    default:
      return state;
  }
};
