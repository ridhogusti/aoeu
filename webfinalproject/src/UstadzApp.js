import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ArtikelUstadz from './components/ArtikelUstadz/ArtikelUstadzPage';
import ModalArtikelUstadz from './components/ArtikelUstadz/ModalArtikelUstadz';

// import requireAuth from './utils/requireAuth';
import NavigationBar from './components/NavigationBar2';
import FlashMessagesList from './components/flash/FlashMessagesList';

class UstadzApp extends Component {
  render() {
    return (
      <div >
        <NavigationBar />
        <div
          style={{
            marginBottom: '200px',
          }}
        />
        <FlashMessagesList />
        <Switch>
          {/* <Route path="/signup" component={requireAuth(SignupPage)} /> */}
          <Route path="/:username/artikel/edit/:id" component={ModalArtikelUstadz} />
          <Route path="/:username/artikel/add" component={ModalArtikelUstadz} />
          <Route path="/:username/artikel" component={ArtikelUstadz} />
        </Switch>
      </div>
        
    );
  }
}

export default UstadzApp;
