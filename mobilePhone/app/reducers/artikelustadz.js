import {
  FETCH_ARTIKELS,
  LIMIT_ARTIKEL_USTADZ,
  CREATE_ARTIKEL,
  UPDATE_ARTIKEL,
  DELETED_ARTIKEL,
} from '../actions/artikel';

const initialState = {
  data: [],
  error: null,
  isFetched: false,
  jumlahDelete: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTIKELS:
      return { 
        ...state,
        data: action.data.data,
      };
    case LIMIT_ARTIKEL_USTADZ:
      console.log(action.IsData, 'di reducer');
      console.log(...state.data, 'di reducer 2');
      return { 
        ...state,
        data: [...state.data, ...action.IsData],
      };
    case CREATE_ARTIKEL:
      console.log(action.IsData, 'di reducer');
      console.log(...state.data, 'di reducer 2');
      return {
        ...state,
        data: [action.IsData, ...state.data],
        jumlahDelete: state.jumlahDelete - 1,
      };
    case UPDATE_ARTIKEL:
      return {
        ...state,
        data: state.data.map(item => {
          console.log(...state, 'dari map');
          if (item._id === action.IsData._id) return action.IsData;
          return item;
        }),
      };
    case DELETED_ARTIKEL:
      return {
        ...state,
        data: state.data.filter(item => item._id !== action.id),
        jumlahDelete: state.jumlahDelete + 1,
      };
    default:
      return state;
  }
};
