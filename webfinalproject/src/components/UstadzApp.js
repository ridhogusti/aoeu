import React, { Component } from 'react';
// import logo from './logo.svg';
import { Switch, Route } from 'react-router-dom';
// import { Route, IndexRoute } from 'react-router';
// import './App.css';
// import Greetings from './components/Greetings';
// import SignupPage from './components/signup/SignupPage';
// import LoginPage from './components/login/LoginPage';
// import NewEventPage from './components/events/NewEventPage';
// import ArtikelPage from './components/Artikel/ArtikelPage';
// import VideoPage from './components/Video/VideoPage';
// import AudioPage from './components/Audio/AudioPage';
// import JadwalPage from './components/Jadwal/JadwalPage';
// import UstadzPage from './components/Ustadz/UstadzPage';

// import requireAuth from './utils/requireAuth';
import NavigationBar from './NavigationBar2';
import FlashMessagesList from './flash/FlashMessagesList';

class UstadzApp extends Component {
  render() {
    return (
      // <Route path="/" component={App}>
      <div className="">
        <NavigationBar />
        <h1
          id="aoeu"
          style={{
            height: '100px',
            background: 'blue',
          }}
        >aoeu</h1>

        <h1
          id="aoeu2"
          style={{
            height: '1000px',
          }}
        >aoeu</h1>
        {/* <div className="break-a" /> */}
        <FlashMessagesList />
        <Switch>
          {/* <Route path="/signup" component={requireAuth(SignupPage)} /> */}
          {/* <Route path="/signup" component={SignupPage} />
          <Route exact path='/' component={Greetings} />
          <Route path="/login" component={LoginPage} />
          <Route path="/new-event" component={requireAuth(NewEventPage)} />
          <Route path="/artikel" component={ArtikelPage} />
          <Route path="/video" component={VideoPage} />
          <Route path="/audio" component={AudioPage} />
          <Route path="/jadwal" component={JadwalPage} />
          <Route path="/ustadz" component={UstadzPage} /> */}
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

export default UstadzApp;
