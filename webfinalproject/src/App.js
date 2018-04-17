import React, { Component } from 'react';
// import logo from './logo.svg';
import { Switch, Route } from 'react-router-dom';
// import { Route, IndexRoute } from 'react-router';
import './App.css';

import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import NewEventPage from './components/events/NewEventPage';

import requireAuth from './utils/requireAuth';
import NavigationBar from './components/NavigationBar';
import FlashMessagesList from './components/flash/FlashMessagesList';

class App extends Component {
  render() {
    return (
      // <Route path="/" component={App}>
      <div className="container">
        <NavigationBar />
        <FlashMessagesList />
        <Switch>
          <Route path="/signup" component={SignupPage} />
          <Route exact path='/' component={Greetings} />
          <Route path="/login" component={LoginPage} />
          <Route path="/new-event" component={requireAuth(NewEventPage)} />
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
