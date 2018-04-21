import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';

class ArtikelForm extends Component {
  state = {
    _id: this.props.editartikel ? this.props.editartikel._id : null,
    title: this.props.editartikel ? this.props.editartikel.title : '',
    image: this.props.editartikel ? this.props.editartikel.image : null,
    text: this.props.editartikel ? this.props.editartikel.text : '',
    error: '',
    errors: this.props.errorss ? this.props.errorss : '',
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      _id: nextProps.editartikel._id,
      title: nextProps.editartikel.title,
      image: nextProps.editartikel.image,
      text: nextProps.editartikel.text,
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

  handleEditorChange = (e) => {
    this.setState({ text: e.target.getContent() });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { _id } = this.state;
    const image = this.imageInput.files[0];
    const title = this.titleInput.value;
    const text = this.textInput.editor.contentDocument.body.innerHTML;
    this.props.saveArtikel({ _id, title, image, text });
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
              <label htmlFor="inputMDEx">Judul Artikel</label>
            </div>
            <div className="md-form">

              <div className="file-field">
                <div className="btn btn-primary btn-sm float-left">
                  <input
                    ref={imageInput => (this.imageInput = imageInput)}
                    required type="file"
                    name="image"
                    // onChange={this.handleChange}
                  />
                  <span>Pilih Gambar</span>
                </div>
                <div className="file-path-wrapper">
                  <input
                    required
                    value={this.state.image}
                    name="image"
                    // onChange={this.handleChange}
                    className="file-path validate" type="text" placeholder="Upload your file"
                  />
                </div>
              </div>
            </div>
            <br />
            <Editor
              ref={textInput => (this.textInput = textInput)}
              // onChange={this.handleChange}
              name="text"
              // initialValue="<p>Isi artikel di sini</p>"
              value={this.state.text}
              init={{
                plugins: 'link image code',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
              }}
              onChange={this.handleEditorChange}
            />
            <div className="modal-footer">
              {/* <a type="submit" className="btn btn-teal waves-effect waves-light">Simpan</a> */}
              <button type="submit" className="btn btn-teal waves-effect waves-light">Simpan</button>
              {/* <button
                onClick={() => this._handleSubmit(this.state.editMode._id)} 
               type="submit" className="btn btn-teal waves-effect waves-light">Simpan</button> */}
              <a type="button" className="btn btn-outline-teal waves-effect" data-dismiss="modal">Batal</a>
            </div>
          </form> 
        </div>
        <div className="col-3" />
          
      </div>
            
    );
  }
}
export default ArtikelForm;
