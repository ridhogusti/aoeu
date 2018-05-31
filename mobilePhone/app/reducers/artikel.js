import {
  // FETCH_ARTIKELS,
  FETCH_ALL_ARTIKELS,
  CREATE_ARTIKEL,
  UPDATE_ARTIKEL,
  DELETED_ARTIKEL,
  LIMIT_ARTIKEL,
  // // UPDATE_ARTIKEL_ERROR,
  // UPDATE_ARTIKEL_SUCCESS,
  // DELETED_ARTIKEL,
  // DELETED_ARTIKEL_SUCCESS,
  // SEARCH_ARTIKEL,
  // SEARCH_ARTIKEL_SUCCESS,
} from '../actions/artikel';

const initialState = {
  data: [],
  error: null,
  isFetched: false,
  jumlahDelete: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case FETCH_ARTIKELS:
    //   return { 
    //     ...state,
    //     data: action.data.data,
    //   };

    case FETCH_ALL_ARTIKELS:
      return { 
        ...state,
        data: action.data.data,
      };
    case LIMIT_ARTIKEL:
      console.log(action.IsData, 'di reducer');
      console.log(...state.data, 'di reducer 2');
      return { 
        ...state,
        data: [...state.data, ...action.IsData],
      };
    // case CREATE_ARTIKEL:
    //   console.log(action.IsData, 'di reducer');
    //   console.log(...state.data, 'di reducer 2');
    //   return {
    //     ...state,
    //     data: [...state.data, action.IsData],
    //     jumlahDelete: state.jumlahDelete - 1,
    //   };
    // case UPDATE_ARTIKEL:
    //   return {
    //     ...state,
    //     data: state.data.map(item => {
    //       console.log(...state, 'dari map');
    //       if (item._id === action.IsData._id) return action.IsData;
    //       return item;
    //     }),
    //   };

    // case UPDATE_PHONE_SUCCESS:
    //   return state;
    // case DELETED_ARTIKEL:
    //   return {
    //     ...state,
    //     data: state.data.filter(item => item._id !== action.id),
    //     jumlahDelete: state.jumlahDelete + 1,
    //   };
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
