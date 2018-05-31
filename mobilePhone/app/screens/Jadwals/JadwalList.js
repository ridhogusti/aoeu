import React, { Component } from 'react';
import { Content, Text, Body, List, ListItem, Thumbnail } from 'native-base';

class JadwalList extends Component {
  goToCard = (jadwal) => {
    this.props.navigator.push({
      screen: 'push.VideoDetail',
      title: 'Detail Video',
      passProps: {
        sharedImageId: `${jadwal._id}`,
        jadwal,
      },
    });
  };

  render() {
    const { jadwal } = this.props;
    return (
      <Content>
        <List>
          <ListItem>
            <Thumbnail square size={80} source={{ uri: 'https://pn-karawang.go.id/assets/template/ma/front_image/icon-jadwal.png' }} />
            <Body>
              <Text
                style={{
                  color: '#15b287',
                }}
              >Pembicara : {jadwal.author.name}</Text>
              <Text
                style={{
                  color: '#777979',
                }}
                note
              >Tema Kajian : {jadwal.tema}</Text>
              <Text note>Tempat : {jadwal.tempat}</Text>
              <Text
                style={{
                  color: '#f1593a',
                }}
                note
              >Tanggal : {jadwal.tanggal} Waktu : {jadwal.waktu}</Text>
            </Body>
          </ListItem>
        </List>
      </Content>
      // <Content>
      //   <TouchableHighlight
      //     underlayColor={'rgba(0, 0, 0, 0.054)'}
      //     onPress={() => this.goToCard(jadwal)}
      //   >
      //     <Card style={{ flex: 0 }}>
      //       <CardItem>
      //         <Left>
      //           <Body>
      //             <Text>{jadwal.author.name}</Text>
      //             <Text note>{jadwal.createdAt}</Text>
      //           </Body>
      //         </Left>
      //       </CardItem>
      //       <CardItem>
      //         <Body>
      //           {/* <SharedElementTransition
      //             style={styles.imageContainer}
      //             sharedElementId={`${jadwal._id}`}
      //           > */}
      //           {/* <Image source={{ uri: `http://192.168.1.3:3000/images/${artikel.image}` }} style={{ height: 190, width: 190, alignSelf: 'center' }} /> */}
      //           <Image source={{ uri: 'https://brightplanet.com/wp-content/uploads/2016/04/play-1073616_1280-1030x1030.png' }} style={{ height: 190, width: '59%', alignSelf: 'center' }} />
      //           {/* </SharedElementTransition> */}
      //           <Text>
      //             {jadwal.title}
      //           </Text>
      //         </Body>
      //       </CardItem>
      //       <CardItem style={{
      //         width: '100%',
      //         justifyContent: 'center',
      //       }}
      //       >
      //         <Button
      //           onPress={() => this.goToCard(jadwal)}
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

export default JadwalList;
