import React, { Component } from 'react';
import { Content, Text, Body, List, ListItem, Thumbnail } from 'native-base';
// import { Navigation } from 'react-native-navigation';
// import { Provider } from 'react-redux';
// import { registerScreens, registerScreenVisibilityListener } from '../../screens';
// import store from '../../store';
// import Icon from 'react-native-vector-icons/Ionicons';
// registerScreens(store, Provider); // this is where you register all of your app's screens
// registerScreenVisibilityListener();

class UstadzList extends Component {
  render() {
    const { ustadz } = this.props.navigation.getParam('ustadz');
    return (
      <Content>
        <List>
          <ListItem>
            {/* <Thumbnail square size={80} source={{ uri: 'http://alifstream.com/wp-content/uploads/2017/01/siluet.jpg' }} /> */}
            <Body>
              <Text>{ustadz.name}</Text>
              <Text note>{ustadz.username}</Text>
            </Body>
            <Text
              style={{
                color: 'blue',
              }}
              note
            >Detail</Text>
          </ListItem>
        </List>
      </Content> 
    );
  }
}

export default UstadzList;
