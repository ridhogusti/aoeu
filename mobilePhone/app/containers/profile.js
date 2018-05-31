import { connect } from 'react-redux';
import Profile from '../screens/Profile';
import { getDataDiri } from '../actions/profile';

const mapStateToProps = (state) => (
  {
    data: state,
  }
);

const mapDispatchToProps = (dispatch) => ({
  getDataDiri: (token) => {
    dispatch(getDataDiri(token));
  }, 
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
