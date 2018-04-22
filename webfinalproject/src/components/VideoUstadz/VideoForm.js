import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class VideoForm extends Component {
  state = {
    _id: this.props.editvideo ? this.props.editvideo._id : null,
    title: this.props.editvideo ? this.props.editvideo.title : '',
    video: this.props.editvideo ? this.props.editvideo.video : null,
    error: '',
    errors: this.props.errorss ? this.props.errorss : '',
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      _id: nextProps.editvideo._id,
      title: nextProps.editvideo.title,
      video: nextProps.editvideo.video,
      errors: nextProps.errorss,
    });
  }

  handleChange = (e) => {
    // if (this.state.errors[e.target.name]) {
    //   const errors = Object.assign({}, this.state.errors);
    //   delete errors[e.target.name];
    //   this.setState({
    //     [e.target.name]: e.target.value,
    //     errors,
    //   });
    // } else {
    this.setState({ [e.target.name]: e.target.value });
    // }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { _id } = this.state;
    const video = this.videoInput.files[0];
    const title = this.titleInput.value;
    this.props.saveVideo({ _id, title, video });
  }
  render() {
    return (

      <div className="row">
        <div className="col-3" />
        <div className="col-6">
          {/* <form> */}
          <form onSubmit={this.handleSubmit}>

            {this.state.errors}
            <div className="md-form">
              <input 
                required
                type="text"
                id="inputMDEx"
                ref={titleInput => (this.titleInput = titleInput)}
                className="form-control"
                onChange={this.handleChange}
                value={this.state.title}
                name="title"
              />
              <label htmlFor="inputMDEx">Judul Video</label>
            </div>
            <div className="md-form">

              <div className="file-field">
                <div className="btn btn-primary btn-sm float-left">
                  <input
                    ref={videoInput => (this.videoInput = videoInput)}
                    // required
                    type="file"
                    name="video"
                    accept=".mp4"
                    // onChange={this.handleChange}
                  />
                  <span>Pilih Gambar</span>
                </div>
                <div className="file-path-wrapper">
                  <input
                    // required
                    value={this.state.video}
                    name="video"
                    // onChange={this.handleChange}
                    className="file-path validate" type="text" placeholder="Upload your file"
                  />
                </div>
              </div>
            </div>
            <br />
            <div className="modal-footer">
              {/* <a type="submit" className="btn btn-teal waves-effect waves-light">Simpan</a> */}
              <button type="submit" className="btn btn-teal waves-effect waves-light">Simpan</button>
              {/* <button
                onClick={() => this._handleSubmit(this.state.editMode._id)} 
               type="submit" className="btn btn-teal waves-effect waves-light">Simpan</button> */}
              {/* <a type="button" {onClick}={this.props.history.goBack()} className="btn btn-outline-teal waves-effect" data-dismiss="modal">Batal</a> */}
              <button
                type="button"
                className="btn btn-outline-teal waves-effect"
                onClick={() => this.props.history.goBack()}
              >Batal</button>
            </div>
          </form> 
        </div>
        <div className="col-3" />
          
      </div>
            
    );
  }
}
export default withRouter(VideoForm);
