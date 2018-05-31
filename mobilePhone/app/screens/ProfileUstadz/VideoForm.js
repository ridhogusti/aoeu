import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Textarea, Text } from 'native-base';
import { TouchableOpacity, AsyncStorage, TextInput } from 'react-native';
import { connect } from 'react-redux';

import VideoPlayer from 'react-native-video-player';

import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { createVideo, updateVideo } from '../../actions/video';

class VideoForm extends Component {
  static navigatorStyle = {
    screenBackgroundColor: 'white',
  }
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      token: null,
      data: null,
      // namaVideo: null,
      namaVideo: this.props.navigation.getParam('video') ? this.props.navigation.getParam('video').video : null,
      _id: this.props.navigation.getParam('video') ? this.props.navigation.getParam('video')._id : '',
      title: this.props.navigation.getParam('video') ? this.props.navigation.getParam('video').title : '',
      video: this.props.navigation.getParam('video') ? this.props.navigation.getParam('video').video : null,
    };
  }

  async componentDidMount() {
    // const token = await AsyncStorage.getItem('jwtToken');
    this.setState({ token: await AsyncStorage.getItem('jwtToken') });
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      _id: nextProps.editvideo._id,
      title: nextProps.editvideo.title,
      video: nextProps.editvideo.video,
      errors: nextProps.errorss,
    });
  }
  async upload() {
    const token = this.state.token.split('"');
    console.log(token[1]);
    if (this.state._id) {
      this.props.updateVideo(this.state._id, token[1], this.state.title, this.state.namaVideo, this.state.data)
        .then(this.props.navigation.goBack());
    } else {
      this.props.createVideo(token[1], this.state.title, this.state.namaVideo, this.state.data)
        .then(this.props.navigation.goBack());
    }
  }

  show() {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.video()],
    }, (error, res) => {
      if (res === null) {
        console.log(res);
      } else {
      // Android
        console.log(
          res.uri,
          res.type, // mime type
          res.fileName,
          res.fileSize
        );

        this.setState({
          avatarSource: res.uri,
          data: res.uri,
          namaVideo: res.fileName,
        });
      }
    });
  }
  render() {
    let video = this.state.avatarSource == null ? null : (<VideoPlayer
      video={this.state.avatarSource}
      videoWidth={100}
      videoHeight={50}
    />);
    // let img = this.state.avatarSource == null ? null : (<Image 
    //   source={this.state.avatarSource}
    //   style={{ height: 200, width: 200 }}
    // />);
    if (video == null) {
      video = this.state.video === null ? null : (<VideoPlayer 
        // source={{ uri: `http://192.168.100.215:3000/uploads/thumb_250/${this.state.image}` }}
        video={this.state.avatarSource}
        // style={{ height: 200, width: 200 }}
        videoWidth={100}
        videoHeight={50}
      />
      );
    }
    return (
      <Container>
        <Content>
          <Form
            style={{
              margin: 10,
            }}
          >
            <Label>Judul</Label>
            <TextInput
              style={{
                height: 50,
                width: '100%',
                backgroundColor: '#fefefe',
                borderWidth: 1,
                borderRadius: 5,
                paddingTop: 0,
                paddingBottom: 0,
              }}
              placeholder="Tuliskan Judul Artikel"
              required
              id="title"
              ref={titleInput => (this.titleInput = titleInput)}
              onChangeText={
                (title) => {
                  this.setState({ title });
                }
              }
              value={this.state.title}
              name="title"
            />
            <TouchableOpacity 
              onPress={this.show.bind(this)}
            >
              <Text>Show Image Picker</Text>
            </TouchableOpacity>
            <Text>
Nama Video :              {this.state.namaVideo}
            </Text>
            <TouchableOpacity
              onPress={this.upload.bind(this)}
            >
              <Text>Upload Video</Text>
            </TouchableOpacity>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default connect(null, { createVideo, updateVideo })(VideoForm);
