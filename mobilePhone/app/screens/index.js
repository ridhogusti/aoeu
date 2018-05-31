import { Navigation, ScreenVisibilityListener } from 'react-native-navigation';

import FirstScreen from './FirstScreen';

import Home from '../containers/home';
import ArtikelPage from './Artikels/ArtikelPage';
import ArtikelDetail from './Artikels/ArtikelDetail';
import VideoDetail from './Videos/VideoDetail';
import VideoPage from './Videos/VideoPage';
import AudioPage from './Audios/AudioPage';
import Heroes from '../containers/heroes';
import Settings from './Settings';

import HeroAdd from './Hero/HeroAdd';
import HeroView from './Hero/HeroView';
import HeroEdit from './Hero/HeroEdit';
import Login from './Login';
import Loginn from './Loginn';
import Profile from '../containers/profile';
import Drawer from '../components/Drawer';
import HomeView from '../components/HomeView';
import JadwalPage from './Jadwals/JadwalPage';
import UstadzPage from './Ustadz/UstadzPage';
import ProfileUstadzPage from './ProfileUstadz/ProfileUstadzPage';
import VideoDetailUstadz from './ProfileUstadz/VideoDetail';
import ArtikelForm from './ProfileUstadz/ArtikelForm';
import VideoForm from './ProfileUstadz/VideoForm';
import TentangPage from './Tentang/TentangPage';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('push.FirstScreen', () => FirstScreen, store, Provider);
  Navigation.registerComponent('tab.Artikel', () => ArtikelPage, store, Provider);
  Navigation.registerComponent('tab.Video', () => VideoPage, store, Provider);
  Navigation.registerComponent('tab.Audio', () => AudioPage, store, Provider);
  Navigation.registerComponent('tab.Jadwal', () => JadwalPage, store, Provider);
  Navigation.registerComponent('tab.Ustadz', () => UstadzPage, store, Provider);
  Navigation.registerComponent('tab.Tentang', () => TentangPage, store, Provider);
  Navigation.registerComponent('push.ProfileUstadzPage', () => ProfileUstadzPage, store, Provider);
  Navigation.registerComponent('push.ArtikelDetail', () => ArtikelDetail, store, Provider);
  Navigation.registerComponent('push.VideoDetail', () => VideoDetail, store, Provider);
  Navigation.registerComponent('push.VideoDetailUstadz', () => VideoDetailUstadz, store, Provider);
  Navigation.registerComponent('push.ArtikelForm', () => ArtikelForm, store, Provider);
  Navigation.registerComponent('push.VideoForm', () => VideoForm, store, Provider);
  Navigation.registerComponent('push.HomeView', () => HomeView, store, Provider);
  Navigation.registerComponent('tab.Heroes', () => Heroes, store, Provider);
  Navigation.registerComponent('tab.Settings', () => Settings);
  Navigation.registerComponent('push.HeroAdd', () => HeroAdd, store, Provider);
  Navigation.registerComponent('push.HeroView', () => HeroView, store, Provider);
  Navigation.registerComponent('push.HeroEdit', () => HeroEdit, store, Provider);
  Navigation.registerComponent('Login', () => Login, store, Provider);
  Navigation.registerComponent('Loginn', () => Loginn, store, Provider);
  Navigation.registerComponent('Profile', () => Profile, store, Provider);
  Navigation.registerComponent('Drawer', () => Drawer, store, Provider);
}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    // willAppear: ({ screen }) => console.log(`Displaying screen ${screen}`),
    // didAppear: ({ screen, startTime, endTime, commandType }) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
    // willDisappear: ({ screen }) => console.log(`Screen will disappear ${screen}`),
    // didDisappear: ({ screen }) => console.log(`Screen disappeared ${screen}`),
  }).register();
}
