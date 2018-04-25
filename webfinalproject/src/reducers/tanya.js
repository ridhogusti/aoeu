import {
  FETCH_TANYAS,
  CREATE_TANYA,
  CREATE_JAWAB,
} from '../actions/tanya';

const initialState = {
  data: [],
  error: null,
  isFetched: false,
  jumlahDelete: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TANYAS:
      return { 
        ...state,
        data: action.data.data,
      };

    case CREATE_TANYA:
      return { 
        ...state,
        data: [action.IsData.data, ...state.data],
      };
    // case LIMIT_JADWAL:
    //   console.log(action.IsData, 'di reducer');
    //   console.log(...state.data, 'di reducer 2');
    //   return { 
    //     ...state,
    //     data: [...state.data, ...action.IsData],
    //   };
    case CREATE_JAWAB:
      return {
        ...state,
        data: state.data.map(item => {
          if (item._id === action.IsData.data._id) return action.IsData.data;
          return item;
        }),
        // data: [action.IsData.data],
      };
    default:
      return state;
  }
};
