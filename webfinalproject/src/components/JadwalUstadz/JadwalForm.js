import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class JadwalForm extends Component {
  state = {
    _id: this.props.editjadwal ? this.props.editjadwal._id : null,
    tanggal: this.props.editjadwal ? this.props.editjadwal.tanggal : '',
    waktu: this.props.editjadwal ? this.props.editjadwal.waktu : '',
    tema: this.props.editjadwal ? this.props.editjadwal.tema : '',
    tempat: this.props.editjadwal ? this.props.editjadwal.tempat : '',
    error: '',
    errors: this.props.errorss ? this.props.errorss : '',
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      _id: nextProps.editjadwal._id,
      tanggal: nextProps.editjadwal.tanggal,
      waktu: nextProps.editjadwal.waktu,
      tema: nextProps.editjadwal.tema,
      tempat: nextProps.editjadwal.tempat,
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
    const tanggal = this.tanggalInput.value;
    const waktu = this.waktuInput.value;
    const tema = this.temaInput.value;
    const tempat = this.tempatInput.value;
    this.props.saveJadwal({ _id, tanggal, waktu, tema, tempat });
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
                // onClick={this.test}
                placeholder="Pilih tanggal"
                ref={tanggalInput => (this.tanggalInput = tanggalInput)}
                name="tanggal"
                type="text"
                id="date-picker-example"
                className="form-control datepicker picker__input"
                onChange={this.handleChange}
                value={this.state.tanggal}
                readOnly aria-haspopup="true" aria-readonly="false" aria-owns="date-picker-example_root"
              />

              {/* <label htmlFor="date-picker-example">Try me...</label> */}
            </div>
            <div className="md-form">
              <input 
                placeholder="Pilih waktu"
                type="text"
                ref={waktuInput => (this.waktuInput = waktuInput)}
                name="waktu"
                id="input_starttime"
                onChange={this.handleChange}
                className="form-control timepicker"
                value={this.state.waktu}
              />
              {/* <label htmlFor="input_starttime">Light version, 12hours</label> */}
            </div>
            <div className="md-form">
              <input 
                required
                type="text"
                id="tema"
                ref={temaInput => (this.temaInput = temaInput)}
                className="form-control"
                onChange={this.handleChange}
                value={this.state.tema}
                name="tema"
              />
              <label htmlFor="tema">Tema Kajian</label>
            </div>
            <div className="md-form">
              <input 
                required
                type="text"
                id="tempat"
                ref={tempatInput => (this.tempatInput = tempatInput)}
                className="form-control"
                onChange={this.handleChange}
                value={this.state.tempat}
                name="tempat"
              />
              <label htmlFor="tempat">Tempat</label>
            </div>
            <br />
            <div className="modal-footer">
              {/* <a type="submit" className="btn btn-teal waves-effect waves-light">Simpan</a> */}
              <button type="submit" className="btn btn-teal waves-effect waves-light">Simpan</button>
              {/* <button
                onClick={() => this._handleSubmit(this.state.editMode._id)} 
               type="submit" className="btn btn-teal waves-effect waves-light">Simpan</button> */}
              {/* <a type="button"
             {onClick}={this.props.history.goBack()} className="btn btn-outline-teal waves-effect" data-dismiss="modal">Batal</a> */}
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
export default withRouter(JadwalForm);
