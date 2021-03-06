import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import artikels from './reducers/artikels';
import ustadzs from './reducers/ustadz';
import editartikel from './reducers/editartikel';
import videos from './reducers/videos';
import audios from './reducers/audios';
import editvideo from './reducers/editvideo';
import editaudio from './reducers/editaudio';
import editjadwal from './reducers/editjadwal';
import jadwals from './reducers/jadwals';
import tentang from './reducers/tentang';
import tanya from './reducers/tanya';
import countArtikel from './reducers/countArtikel';
import countVideo from './reducers/countVideo';

export default combineReducers({
  flashMessages,
  auth,
  artikels,
  ustadzs,
  editartikel,
  videos,
  editvideo,
  audios,
  editaudio,
  editjadwal,
  jadwals,
  tentang,
  tanya,
  countArtikel,
  countVideo,
});
