import { connect } from 'react-redux';
import Home from '../screens/Home';
import { getBerita } from '../actions/home';

const mapStateToProps = (state) => (
  {
    data: state,
  }
);

const mapDispatchToProps = (dispatch) => ({
  getBerita: (token) => {
    dispatch(getBerita(token));
  }, 
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

