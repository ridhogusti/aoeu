import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ArtikelUstadz from './components/ArtikelUstadz/ArtikelUstadzPage';
import VideoUstadz from './components/VideoUstadz/VideoUstadzPage';
import AudioUstadz from './components/AudioUstadz/AudioUstadzPage';
import JadwalUstadz from './components/JadwalUstadz/JadwalUstadzPage';
import ModalArtikelUstadz from './components/ArtikelUstadz/ModalArtikelUstadz';
import ModalVideoUstadz from './components/VideoUstadz/ModalVideoUstadz';
import ModalAudioUstadz from './components/AudioUstadz/ModalAudioUstadz';
import ModalJadwalUstadz from './components/JadwalUstadz/ModalJadwalUstadz';
import TentangUstadz from './components/TentangUstadz/TentangUstadzPage';

// import requireAuth from './utils/requireAuth';
import NavigationBar from './components/NavigationBar2';
import FlashMessagesList from './components/flash/FlashMessagesList';

class UstadzApp extends Component {
  render() {
    // console.log(this.props.match.params.username);
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
          <Route path="/:username/audio/edit/:id" component={ModalAudioUstadz} />
          <Route path="/:username/audio/add" component={ModalAudioUstadz} />
          <Route path="/:username/audio" component={AudioUstadz} />
          <Route path="/:username/jadwal/edit/:id" component={ModalJadwalUstadz} />
          <Route path="/:username/jadwal/add" component={ModalJadwalUstadz} />
          <Route path="/:username/jadwal" component={JadwalUstadz} />
          <Route path="/:username/tentang" component={TentangUstadz} />
        </Switch>
      </div>
        
    );
  }
}

export default UstadzApp;
