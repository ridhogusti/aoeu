import React, { Component } from 'react';

class ArtikelDetail extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const { location } = this.props;
    console.log(location);
    const uriImage = `http://maridakwah.com:3000/images/${location.state.artikel.image}`;
    return (
      <section className="pt-5 mt-4 pb-3">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-cascade wider reverse">
              <div className="view overlay mx-auto">
                <img
                  alt={uriImage}
                  src={uriImage} 
                  className="img-fluid"
                />
                <a>
                  <div className="mask rgba-white-slight" />
                </a>
              </div>
              <div className="card-body text-center">
                <h2>
                  <a className="font-weight-bold">{location.state.artikel.title}</a>
                </h2>
                <p>Written by
                  <a> {location.state.artikel.author.name}</a>, {location.state.artikel.updatedAt}</p>
              </div>
            </div>
            <div className="excerpt mt-5">
              <div dangerouslySetInnerHTML={{ __html: location.state.artikel.text }} /> 
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ArtikelDetail;
