const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  heroes: [],
  diri: {},
};
  
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_DATA_DIRI_PENDING':
      return { ...state, fetching: true };
    case 'GET_DATA_DIRI_FULFILLED':
      return { ...state, fetching: false, fetched: true, diri: action.payload.data.data };
    case 'GET_DATA_DIRI_REJECTED':
      return { ...state, fetching: false, error: action.payload };
    default:
  }
  return state;
}
  
export default reducer;
