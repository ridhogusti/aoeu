import React, { Component } from 'react';
import { Content, Text, Body, List, ListItem, Thumbnail } from 'native-base';
import { TouchableOpacity } from 'react-native';
// import { Provider } from 'react-redux';
// import { registerScreens, registerScreenVisibilityListener } from '../../screens';
// import store from '../../store';
// import Icon from 'react-native-vector-icons/Ionicons';
// registerScreens(store, Provider); // this is where you register all of your app's screens
// registerScreenVisibilityListener();

class UstadzList extends Component {
  toProfileUstadz = (ustadz) => {
    this.props.navigation.navigate(
      'UstadzDetail',
      { ustadz }
    );
  }
  render() {
    const { ustadz } = this.props;
    return (
      <Content>
        <List>
          <ListItem>
            {/* <Thumbnail square size={80} source={{ uri: 'http://alifstream.com/wp-content/uploads/2017/01/siluet.jpg' }} /> */}
            <Body>
              <Text>{ustadz.name}</Text>
              <Text note>{ustadz.username}</Text>
            </Body>
            <TouchableOpacity
              onPress={() => this.toProfileUstadz(ustadz)}
            >
              <Text
                style={{
                  color: 'blue',
                }}
                note
              >Detail</Text>
            </TouchableOpacity>
          </ListItem>
        </List>
      </Content> 
    );
  }
}

export default UstadzList;
