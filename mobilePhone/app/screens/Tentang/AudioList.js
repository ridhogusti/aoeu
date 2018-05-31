import React, { Component } from 'react';
import { Content, Text, Body, List, ListItem, Thumbnail } from 'native-base';

class VideoList extends Component {
  goToCard = (audio) => {
    this.props.navigator.push({
      screen: 'push.VideoDetail',
      title: 'Detail Video',
      passProps: {
        sharedImageId: `${audio._id}`,
        audio,
      },
    });
  };

  render() {
    const { audio } = this.props;
    return (
      <Content>
        <List>
          <ListItem>
            <Thumbnail square size={80} source={{ uri: 'Image URL' }} />
            <Body>
              <Text>{audio.audio}</Text>
              <Text>{audio.title}</Text>
              <Text note>{audio.author.name}</Text>
            </Body>
          </ListItem>
        </List>
      </Content>
      // <Content>
      //   <TouchableHighlight
      //     underlayColor={'rgba(0, 0, 0, 0.054)'}
      //     onPress={() => this.goToCard(audio)}
      //   >
      //     <Card style={{ flex: 0 }}>
      //       <CardItem>
      //         <Left>
      //           <Body>
      //             <Text>{audio.author.name}</Text>
      //             <Text note>{audio.createdAt}</Text>
      //           </Body>
      //         </Left>
      //       </CardItem>
      //       <CardItem>
      //         <Body>
      //           {/* <SharedElementTransition
      //             style={styles.imageContainer}
      //             sharedElementId={`${audio._id}`}
      //           > */}
      //           {/* <Image source={{ uri: `http://192.168.1.3:3000/images/${artikel.image}` }} style={{ height: 190, width: 190, alignSelf: 'center' }} /> */}
      //           <Image source={{ uri: 'https://brightplanet.com/wp-content/uploads/2016/04/play-1073616_1280-1030x1030.png' }} style={{ height: 190, width: '59%', alignSelf: 'center' }} />
      //           {/* </SharedElementTransition> */}
      //           <Text>
      //             {audio.title}
      //           </Text>
      //         </Body>
      //       </CardItem>
      //       <CardItem style={{
      //         width: '100%',
      //         justifyContent: 'center',
      //       }}
      //       >
      //         <Button
      //           onPress={() => this.goToCard(audio)}
      //           full textStyle={{ color: '#87838B' }} 
      //           style={{
      //             width: 1000,
      //           }}
      //         >
      //           <Text>Baca</Text>
      //         </Button>
      //       </CardItem>
      //     </Card>
      //   </TouchableHighlight>
        
      // </Content>
    );
  }
}

export default VideoList;
