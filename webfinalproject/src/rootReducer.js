import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import artikels from './reducers/artikels';
import ustadzs from './reducers/ustadz';
import editartikel from './reducers/editartikel';
import videos from './reducers/videos';
import editvideo from './reducers/editvideo';

export default combineReducers({
  flashMessages,
  auth,
  artikels,
  ustadzs,
  editartikel,
  videos,
  editvideo,
});
