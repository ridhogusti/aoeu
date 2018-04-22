import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './scriptartikel';
import AudioList from './AudioList';
import { fetchAllAudios, limitAudioUmum } from '../../actions/audio';

class AudioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 0,
    };
  }
  componentDidMount() {
    this.props.fetchAllAudios();
    window.scrollTo(0, 0);
  }
  limitArtikell = () => {
    console.log('hai');
    this.props.limitAudioUmum(this.state.limit);
    this.setState({ limit: this.state.limit + 4 });
  }
  render() {
    const { audios } = this.props;
    return (
      <div>
        <div
          className="row"
        >
        
          <div className="col-1" />
          <div className="col-10">
            {/* Carousel Wrapper*/}
            <div id="carousel-example-1z" className="carousel slide carousel-fade" data-ride="carousel">
              {/* Indicators*/}
              <ol className="carousel-indicators">
                <li data-target="#carousel-example-1z" data-slide-to={0} className="active" />
                <li data-target="#carousel-example-1z" data-slide-to={1} />
                <li data-target="#carousel-example-1z" data-slide-to={2} />
              </ol>
              {/* /.Indicators*/}
              {/* Slides*/}
              <div className="carousel-inner" role="listbox">
                {/* First slide*/}
                <div className="carousel-item active">
                  <img className="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg" alt="First slide" />
                </div>
                {/* /First slide*/}
                {/* Second slide*/}
                <div className="carousel-item">
                  <img className="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20(129).jpg" alt="Second slide" />
                </div>
                {/* /Second slide*/}
                {/* Third slide*/}
                <div className="carousel-item">
                  <img className="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg" alt="Third slide" />
                </div>
                {/* /Third slide*/}
              </div>
              {/* /.Slides*/}
              {/* Controls*/}
              <a className="carousel-control-prev" href="#carousel-example-1z" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carousel-example-1z" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="sr-only">Next</span>
              </a>
              {/* /.Controls*/}
            </div>
            {/* /.Carousel Wrapper*/}

          </div>

          <div className="col-1" />
        </div>

        <br />
        <div
          className="row" 

          style={{
            marginRight: '8%',
            marginLeft: '8%',
          }}
        >
          {
            audios.map(audio => <AudioList audio={audio} key={audio._id} />)
          }
          {/* <AudioList />
          <AudioList />
          <AudioList />
          <AudioList />
          <AudioList /> */}
          
        </div>

        <div 
          style={{
            marginRight: '8%',
            marginLeft: '8%',
          }}
          className="row"
        >

          <div className="col-4" />
          <div className="col-4">
            <button type="button" onClick={this.limitArtikell} className="btn btn-default">Load More</button> 
          </div> 
          <div className="col-4" />

        </div>
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    audios: state.audios.data,
  };
}

export default connect(mapStateToProps, { fetchAllAudios, limitAudioUmum })(AudioPage);
