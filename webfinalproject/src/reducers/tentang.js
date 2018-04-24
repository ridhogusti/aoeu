import {
  FETCH_TENTANG,
  UPDATE_PEKERJAAN,
  UPDATE_PENDIDKAN,
  UPDATE_TENTANG,
  DELETED_PEKERJAAN,
  DELETED_PENDIDIKAN,
} from '../actions/tentang';

const initialState = {
  data: [],
  error: null,
  isFetched: false,
  jumlahDelete: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TENTANG:
      console.log(action.data.data, 'aoeu');
      return { 
        ...state,
        data: [action.data.data],
      };
    case UPDATE_TENTANG:
      return { 
        ...state,
        data: [action.IsData.data],
      };
    case UPDATE_PENDIDKAN:
      return {
        ...state,
        data: [...state, action.IsData.data],
      };

    case UPDATE_PEKERJAAN:
      console.log(action.IsData.data, 'reduciree');
      return {
        ...state, 
        data: [...state, action.IsData.data],
      };
    case DELETED_PEKERJAAN:
      return {
        ...state,
        data: [...state, action.IsData.data],
      };
    case DELETED_PENDIDIKAN:
      return {
        ...state,
        data: [...state, action.IsData.data],
      };
    default:
      return state;
  }
};
