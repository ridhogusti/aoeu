import React, { Component } from 'react';
import { Container, Content, Text, Button } from 'native-base';
import { connect } from 'react-redux';
import t from 'tcomb-form-native';
import axios from 'axios';
import { getHero, fetchHeroes } from '../../actions/heroes';

const Form = t.form.Form;
const FormSchema = t.struct({
  name: t.String,
  imageUri: t.String,
  title: t.String,
  role: t.String,
  speciality: t.String,
});

class HeroEdit extends Component {
    state = {
      value: {},
    }
    componentDidMount() {
      const { id } = this.props;
      this.props.dispatch(getHero(id));
    }
    handleEdit() {
      const { id } = this.props;
      const value = this.refs.form.getValue();
      if (value) {
        axios.put(`http://rest.learncode.academy/api/ridhogusti/heroes/${id}`, value)
          .then((result) => {
            this.props.dispatch(fetchHeroes());
            this.props.navigator.popToRoot({
              animated: true,
              animationType: 'fadeIn',
            });
            // this.props.navigator.resetTo({
            //   screen: 'tab.Heroes',
            //   title: 'Heroes',
            // });
          });
      }
    }
    render() {
      const { hero } = this.props.data.heroesReducer;
      return (
        <Container
          style={{ padding: 10 }}
        >
          <Content>
            <Form
              ref="form"
              type={FormSchema}
              value={hero}
            />
            <Button
              full
              success
              onPress={() => this.handleEdit()}
            >
              <Text>Edit</Text>
            </Button>
          </Content>
        </Container>
      );
    }
}

const mapStateToProps = (state) => ({
  data: state,
});

export default connect(mapStateToProps)(HeroEdit);
