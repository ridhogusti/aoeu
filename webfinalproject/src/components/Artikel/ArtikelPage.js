import React, { Component } from 'react';
import { connect } from 'react-redux';
import './scriptartikel';
import ArtikelList from './ArtikelList';
import { fetchAllArtikels, limitArtikelUmum } from '../../actions/artikel';

class ArtikelPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 0,
    };
  }
  componentDidMount() {
    this.props.fetchAllArtikels();
    window.scrollTo(0, 0);
  }

  limitArtikell = () => {
    console.log('hai');
    this.props.limitArtikelUmum(this.state.limit);
    this.setState({ limit: this.state.limit + 4 });
  }
  render() {
    const { artikels } = this.props;
    return (
      <div>
        <div
          style={{
            background: 'black',
            marginRight: '8%',
            marginLeft: '8%',
            textAlign: 'center',
          }}
        >

          <img
            src="http://3.bp.blogspot.com/-p6dsThHBKPI/VmBN6m6szHI/AAAAAAAABcc/gD96RN0VDOc/s1600/kebaiakan.png"
            width="70%"
            style={{
              justifySelf: 'center',
            }}
          />
        </div>
        <div
          className="row" 

          style={{
            marginRight: '8%',
            marginLeft: '8%',
          }}
        >

          {
            artikels.map(artikel => <ArtikelList artikel={artikel} key={artikel._id} />)
          }
          {/* <ArtikelList />
          <ArtikelList />
          <ArtikelList />
          <ArtikelList />
          <ArtikelList /> */}
          
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
    artikels: state.artikels.data,
  };
}

export default connect(mapStateToProps, { fetchAllArtikels, limitArtikelUmum })(ArtikelPage);
