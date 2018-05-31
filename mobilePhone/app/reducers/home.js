const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  beritas: [],
};
    
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_BERITA_PENDING':
      return { ...state, fetching: true };
    case 'GET_BERITA_FULFILLED':
      return { ...state, fetching: false, fetched: true, beritas: action.payload.data.data };
    case 'GET_BERITA_REJECTED':
      return { ...state, fetching: false, error: action.payload };
    default:
  }
  return state;
}
    
export default reducer;
  
