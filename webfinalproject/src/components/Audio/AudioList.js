import React, { Component } from 'react';
import Audio from 'react-audioplayer';

class AudioList extends Component {
  render() {
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
              <img src="https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg" className="img-fluid" />
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
              <strong>Judul Audio</strong>
            </h7>
            <p>
            Pembicara : 
              <strong> Ustadz Abdul Somad</strong>
              <br />
            Tanggal : 
              <strong> 19/08/2018 </strong>
            </p>
            <p />

            <Audio
              width={80}
              height={100}
              // autoPlay
              playlist={[
                {
                  // name: 'Shape of you',
                  src: 'https://raw.githubusercontent.com/wenliangdai/react-audioplayer/master/src/songs/rise.mp3',
                  // img: 'http://oss.tan8.com/yuepuku/100/50357/50357_prev.jpg?v=1487820191',
                },
              ]}
            />

          </div>
        </div>
      </div>
    );
  }
}

export default AudioList;
