import React, { Component } from 'react';

class AudioList extends Component {
  render() {
    const { audio } = this.props;
    const linkAudio = `http://maridakwah.com:3000/audios/${audio.audio}`;
    return (
      <div
        style={{
          marginBottom: '1%',
          marginRight: '1%',
          width: '48%',
          // height: '180px',
        }}
        className="card"
      >
        <div className="row">
          <div className="col-5">
            <div className="view overlay rounded z-depth-2">
              <img
                alt="his"
                src="https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg" className="img-fluid"
              />
              <a>
                <div className="mask waves-effect waves-light" />
              </a>
            </div>
          </div>
          <div
            style={{
              marginTop: '6px',
            }}
            className="col-6"
          >
            <h7 className="mb-4 font-weight-bold dark-grey-text">
              <strong>{audio.title}</strong>
            </h7>
            <p>
            Pembicara : 
              <strong>{audio.author.name}</strong>
              <br />
            Tanggal : 
              <strong>{audio.updatedAt}</strong>
            </p>
            <p />

            <audio controls>
              <source src={linkAudio} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>
    );
  }
}

export default AudioList;
