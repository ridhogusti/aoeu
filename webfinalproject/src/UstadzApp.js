import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ArtikelUstadz from './components/ArtikelUstadz/ArtikelUstadzPage';
import VideoUstadz from './components/VideoUstadz/VideoUstadzPage';
import ModalArtikelUstadz from './components/ArtikelUstadz/ModalArtikelUstadz';
import ModalVideoUstadz from './components/VideoUstadz/ModalVideoUstadz';

// import requireAuth from './utils/requireAuth';
import NavigationBar from './components/NavigationBar2';
import FlashMessagesList from './components/flash/FlashMessagesList';

class UstadzApp extends Component {
  render() {
    console.log(this.props.match.params.username);
    return (
      <div >
        <NavigationBar namaUstadz={this.props.match.params.username} />
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
          <Route path="/:username/video/edit/:id" component={ModalVideoUstadz} />
          <Route path="/:username/video/add" component={ModalVideoUstadz} />
          <Route path="/:username/video" component={VideoUstadz} />
        </Switch>
      </div>
        
    );
  }
}

export default UstadzApp;
