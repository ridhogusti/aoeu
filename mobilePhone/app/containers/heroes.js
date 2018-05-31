import { connect } from 'react-redux';
import Heroes from '../screens/Hero/Heroes';
import { fetchHeroes } from '../actions/heroes';

const mapStateToProps = (state) => (
  {
    data: state,
  }
);

const mapDispatchToProps = (dispatch) => ({
  fetchHeroes: () => {
    dispatch(fetchHeroes());
  }, 
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Heroes);
