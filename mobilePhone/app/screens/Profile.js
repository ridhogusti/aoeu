import React from 'react';
import { StyleSheet, View, AsyncStorage, Text, Image,
  Dimensions,
} from 'react-native';
import { Thumbnail, List, ListItem, Left, Icon, Body, Right,
  Content, Container, Header, Title,
  Button,
} from 'native-base';

const ACCESS_TOKEN = 'access_token';

class Profile extends React.Component {
  static navigatorStyle = {
    navBarHidden: true,
  }

  componentDidMount() {
    this.getToken();
  }

  async getToken() {
    try {
      const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      const aoeu = accessToken.split('"');
      console.log(aoeu[3]);
      this.props.getDataDiri(aoeu[3]);
      console.log(this.props.getDataDiri(aoeu[3]));
    } catch (error) {
      console.log('Something went wrong');
    }
  }

  _header() {
    return (
      <Header>
        <Left>
          <Button
            transparent
            onPress={() => this.props.navigator.dismissModal({
              animationType: 'slide-down',
            })}
          >
            <Icon name='close' />
          </Button>
        </Left>
        <Body>
          <Title>Profile</Title>
        </Body>
        <Right />
      </Header>
    );
  }
  render() {
    const { diri } = this.props.data.profileReducer;
    const dimensions = Dimensions.get('window').width;
    const datas = [
      {
        icon: 'plane',
        text: 'NISN',
        content: diri.nisn,
      },
      {
        icon: 'plane',
        text: 'Agama',
        content: diri.agama,
      },

      {
        icon: 'plane',
        text: 'Alamat',
        content: diri.alamat,
      },

      {
        icon: 'plane',
        text: 'Tanggal Lahir',
        content: diri.tgl_lahir,
      },

      {
        icon: 'plane',
        text: 'Nama Ayah',
        content: diri.nm_ayah,
      },

      {
        icon: 'plane',
        text: 'Nama Ibu',
        content: diri.nm_ibu,
      },

      {
        icon: 'plane',
        text: 'Telepon Ortu',
        content: diri.telp_ortu,
      },
    ];
    return (
      <Container>
        {this._header()}
        <View style={styles.container}>
          <Thumbnail
            square
            style={{ 
              width: dimensions,
              height: 200,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            source={{ uri: `http://pantausiswa.xyz/uploads/${diri.photo}` }}
          >
            <Thumbnail
              large
              source={{ uri: `http://pantausiswa.xyz/uploads/${diri.photo}` }}
            />

            <Text
              style={{ 
                backgroundColor: 'transparent',
                color: '#fff',
              }}
            >{diri.name}</Text>
            <Text
              style={{ 
                backgroundColor: 'transparent',
                color: '#fff',
              }}
            >{diri.diterima_kelas}</Text>
          </Thumbnail>
          <Content>
            <List
              dataArray={datas}
              renderRow={
                data => (<ListItem icon>
                  <Left>
                    <Icon name={data.icon} />
                  </Left>
                  <Body>
                    <Text> <Text style={{ color: 'grey' }}>{data.text}</Text> : {data.content} </Text>
                  </Body>
                </ListItem>)
              }
            />
            
          </Content> 
        </View>
      </Container>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  button: {
    marginTop: 16,
  },
});

export default Profile;
