import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
// import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
// import Reactotron from 'reactotron-react-native';
import promise from 'redux-promise-middleware';
import heroesReducer from './reducers/heroes';
import profileReducer from './reducers/profile';
import homeReducer from './reducers/home';
import artikels from './reducers/artikel';
import videos from './reducers/videos';
import auth from './reducers/auth';
import audios from './reducers/audios';
import jadwals from './reducers/jadwals';
import ustadz from './reducers/ustadz';
import artikelustadz from './reducers/artikelustadz';
import countArtikelUstadz from './reducers/countArtikelUstadz';
import videoustadz from './reducers/videoustadz';
import countVideoUstadz from './reducers/countVideoUstadz';
import ustadzdetail from './reducers/ustadzdetail';
import videodetail from './reducers/videodetail';
import videodetailustadz from './reducers/videodetailustadz';
import audioustadz from './reducers/audioustadz';
import jadwalustadz from './reducers/jadwalustadz';

const reducer = combineReducers({
  heroesReducer,
  profileReducer,
  homeReducer,
  auth,
  artikels,
  videos,
  audios,
  jadwals,
  ustadz,
  artikelustadz,
  countArtikelUstadz,
  videoustadz,
  countVideoUstadz,
  ustadzdetail,
  videodetail,
  videodetailustadz,
  audioustadz,
  jadwalustadz,
}); 

const middleware = compose(applyMiddleware(thunk, promise()), window.devToolsExtension ? window.devToolsExtension() : f => f);

const store = createStore(reducer, middleware);
// const store = Reactotron.createStore(reducer, middleware);

export default store;
