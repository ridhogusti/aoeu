import axios from 'axios';

export function fetchHeroes() {
  return {
    type: 'FETCH_HEROES',
    payload: axios.get('http://rest.learncode.academy/api/ridhogusti/heroes'),
  };
}

export function getHero(id) {
  return {
    type: 'GET_HERO',
    payload: axios.get(`http://rest.learncode.academy/api/ridhogusti/heroes/${id}`),
  };
}
