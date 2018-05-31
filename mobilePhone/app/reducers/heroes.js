const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  heroes: [],
  hero: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_HEROES_PENDING':
      return { ...state, fetching: true };
    case 'FETCH_HEROES_FULFILLED':
      return { ...state, fetching: false, fetched: true, heroes: action.payload.data };
    case 'FETCH_HEROES_REJECTED':
      return { ...state, fetching: false, error: action.payload };
    case 'GET_HERO_PENDING':
      return { ...state, fetching: true };
    case 'GET_HERO_FULFILLED':
      return { ...state, fetching: false, fetched: true, hero: action.payload.data };
    case 'GET_HERO_REJECTED':
      return { ...state, fetching: false, error: action.payload };
    default:
  }
  return state;
}

export default reducer;
