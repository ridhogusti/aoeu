import React, { Component, PropTypes } from 'react';
import { Container, Content, Text, Header, Left, Right, Body, Icon,
  List, ListItem, Thumbnail, Button,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchHeroes } from '../../actions/heroes';

class HeroView extends Component {
    static navigatorStyle = {
      navBarHidden: true,
      tabBarHidden: true,
    }

    handleDelete(id) {
      axios.delete(`http://rest.learncode.academy/api/ridhogusti/heroes/${id}`)
        .then(() => {
          this.props.dispatch(fetchHeroes());
          this.props.navigator.pop();
        });
    }

    handleGoToEdit(id) {
      this.props.navigator.push({
        screen: 'push.HeroEdit',
        title: 'Edit Hero',
        passProps: {
          id,
        },
      });
    }

    renderHeader() {
      return (
        <Header>
          <Left>
            <TouchableOpacity onPress={() => this.props.navigator.pop()}>
              <Icon name='arrow-back' style={{ color: '#62AFEF' }} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text>Hero Detail</Text>
          </Body>
          <Right />
        </Header>
      );
    }
    render() {
      const { hero } = this.props;

      return (
        <Container>
          {this.renderHeader()}
          <Content>
            <List>
              <ListItem>
                <Thumbnail square size={80} source={{ uri: hero.imageUri }} />
                <Body>
                  <Text>{hero.name}</Text>
                  <Text note>{hero.title}</Text>
                  <TouchableOpacity
                    onPress={() => this.handleGoToEdit(hero.id)}
                  >
                    <Text
                      style={{ color: '#41B0F5' }}
                    >Edit</Text>
                  </TouchableOpacity>
                </Body>
              </ListItem>
              <ListItem itemDivider>
                <Text>Role</Text>
              </ListItem>
              <ListItem>
                <Text>{hero.role}</Text>
              </ListItem>
              <ListItem itemDivider>
                <Text>Speciality</Text>
              </ListItem>
              <ListItem>
                <Text>{hero.speciality}</Text>
              </ListItem>
              <ListItem itemDivider>
                <Text>Skills</Text>
              </ListItem>
              <ListItem>
                <Text>...</Text>
              </ListItem>
            </List>
            <Button
              full
              danger
              onPress={() => this.handleDelete(hero.id)}
            >
              <Text>Delete</Text>
            </Button>
          </Content>
        </Container>
      );
    }
}

HeroView.propTypes = {
  hero: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({

});
export default connect(mapStateToProps)(HeroView);
