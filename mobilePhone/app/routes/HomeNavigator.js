import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ArtikelPage from '../screens/Artikels/ArtikelPage';
import ArtikelDetail from '../screens/Artikels/ArtikelDetail';
import ArtikelForm from '../screens/ProfileUstadz/ArtikelForm';
import VideoPage from '../screens/Videos/VideoPage';
import VideoDetail from '../screens/Videos/VideoDetail';
import VideoDetailUstadz from '../screens/ProfileUstadz/VideoDetail';
import VideoForm from '../screens/ProfileUstadz/VideoForm';
import AudioPage from '../screens/Audios/AudioPage';
import JadwalPage from '../screens/Jadwals/JadwalPage';
import UstadzPage from '../screens/Ustadz/UstadzPage';
import ProfileUstadzPage from '../screens/ProfileUstadz/ProfileUstadzPage';

const NavbarDefaultStyle = {
  backgroundColor: '#f73859',
};

const ArtikelTab = createStackNavigator({
  Artikel: {
    screen: ArtikelPage,
    path: '/',
  },
  ArtikelDetail: {
    screen: ArtikelDetail,
    navigationOptions: ({ navigation }) => ({
      title: 'Detail Artikel',
    }),
  },
},
);

const VideoTab = createStackNavigator({
  Video: {
    screen: VideoPage,
    path: '/',
  },
  VideoDetail: {
    screen: VideoDetail,
    navigationOptions: ({ navigation }) => ({
      title: 'Detail Video',
    }),
  },
});

const UstadzTab = createStackNavigator({
  Ustadz: {
    screen: UstadzPage,
    path: '/',
  },
  UstadzDetail: {
    screen: ProfileUstadzPage,
    navigationOptions: ({ navigation }) => ({
      title: 'Detail Ustadz',
    }),
  },

  ArtikelUstadzDetail: {
    screen: ArtikelDetail,
    navigationOptions: ({ navigation }) => ({
      title: 'Detail Artikel Ustadz',
    }),
  },

  TambahArtikelUstadz: {
    screen: ArtikelForm,
    navigationOptions: ({ navigation }) => ({
      title: 'Tambah Artikel',
    }),
  },

  TambahVideoUstadz: {
    screen: VideoForm,
    navigationOptions: ({ navigation }) => ({
      title: 'Tambah Video',
    }),
  },

  EditVideoUstadz: {
    screen: VideoForm,
    navigationOptions: ({ navigation }) => ({
      title: 'Edit Video',
    }),
  },

  VideoUstadzDetail: {
    screen: VideoDetailUstadz,
    navigationOptions: ({ navigation }) => ({
      title: 'Detail Video Ustadz',
    }),
  },
});

export default createBottomTabNavigator({
  Artikel: {
    screen: ArtikelTab,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => (
        <Icon name="newspaper" size={25} color={tintColor} />
      ),
    }),
  },
  Video: {
    screen: VideoTab,
    navigationOptions: {
      headerStyle: NavbarDefaultStyle,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="video" size={25} color={tintColor} />
      ),
    },
  },

  Audio: {
    screen: AudioPage,
    navigationOptions: {
      headerStyle: NavbarDefaultStyle,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="audiobook" size={25} color={tintColor} />
      ),
    },
  },
  Jadwal: {
    screen: JadwalPage,
    navigationOptions: {
      headerStyle: NavbarDefaultStyle,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="alarm" size={25} color={tintColor} />
      ),
    },
  },
  Ustadz: {
    screen: UstadzTab,
    navigationOptions: {
      headerStyle: NavbarDefaultStyle,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="account" size={25} color={tintColor} />
      ),
    },
  },
}, {
  swipeEnabled: false,
  animationEnabled: false,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showLabel: false,
    showIcon: true,
    inactiveTintColor: '#384259',
    activeTintColor: '#f73859',
    pressColor: '#f73859',
    indicatorStyle: { backgroundColor: '#f73859' },
    style: {
      backgroundColor: '#fff',
    },
  },
});
