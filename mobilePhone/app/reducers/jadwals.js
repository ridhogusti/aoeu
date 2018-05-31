import {
  FETCH_ALL_JADWALS,
  UPDATE_JADWAL,
  DELETED_JADWAL,
  LIMIT_JADWAL,
  CREATE_JADWAL,
} from '../actions/jadwal';

const initialState = {
  data: [],
  error: null,
  isFetched: false,
  jumlahDelete: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_JADWALS:
      return { 
        ...state,
        data: action.data.data,
      };
    case LIMIT_JADWAL:
      console.log(action.IsData, 'di reducer');
      console.log(...state.data, 'di reducer 2');
      return { 
        ...state,
        data: [...state.data, ...action.IsData],
      };
    case CREATE_JADWAL:
      console.log(action.IsData, 'di reducer');
      console.log(...state.data, 'di reducer 2');
      return {
        ...state,
        data: [...state.data, action.IsData],
        jumlahDelete: state.jumlahDelete - 1,
      };
    case UPDATE_JADWAL:
      return {
        ...state,
        data: state.data.map(item => {
          console.log(...state, 'dari map');
          if (item._id === action.IsData._id) return action.IsData;
          return item;
        }),
      };

    // case UPDATE_PHONE_SUCCESS:
    //   return state;
    case DELETED_JADWAL:
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
