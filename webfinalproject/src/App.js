import React, { Component } from 'react';
// import logo from './logo.svg';
import { Switch, Route } from 'react-router-dom';
// import { Route, IndexRoute } from 'react-router';
import './App.css';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import NewEventPage from './components/events/NewEventPage';
import ArtikelPage from './components/Artikel/ArtikelPage';
import VideoPage from './components/Video/VideoPage';
import AudioPage from './components/Audio/AudioPage';
import JadwalPage from './components/Jadwal/JadwalPage';
import UstadzPage from './components/Ustadz/UstadzPage';

import requireAuth from './utils/requireAuth';
import NavigationBar from './components/NavigationBar';
import FlashMessagesList from './components/flash/FlashMessagesList';
import UstadzApp from './UstadzApp';
import ArtikelDetail from './components/Artikel/ArtikelDetail';
import VideoDetail from './components/Video/VideoDetail';

class App extends Component {
  render() {
    return (
      // <Route path="/" component={App}>
      <div className="container-fluid">
        <NavigationBar />
        <div className="break-a" />
        <FlashMessagesList />
        <Switch>
          {/* <Route path="/signup" component={requireAuth(SignupPage)} /> */}
          <Route path="/signup" component={SignupPage} />
          <Route exact path='/' component={Greetings} />
          <Route path="/login" component={LoginPage} />
          <Route path="/new-event" component={requireAuth(NewEventPage)} />
          <Route path="/artikel/detail/:id" component={ArtikelDetail} />
          <Route path="/artikel" component={ArtikelPage} />
          <Route path="/video/detail/:id" component={VideoDetail} />
          <Route path="/video" component={VideoPage} />
          <Route path="/audio" component={AudioPage} />
          <Route path="/jadwal" component={JadwalPage} />
          <Route path="/ustadz" component={UstadzPage} />
          <Route path="/:username/video" component={UstadzApp} />
          <Route path="/:username/artikel" component={UstadzApp} />
          <Route path="/:username/audio" component={UstadzApp} />
          <Route path="/:username/jadwal" component={UstadzApp} />
          <Route path="/:username/tentang" component={UstadzApp} />
          <Route path="/:username/tanya" component={UstadzApp} />

        </Switch>
      </div>
        
    // </Route>
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
    );
  }
}

export default App;
