import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Textarea, Text } from 'native-base';
import { TouchableOpacity, Image, AsyncStorage, TextInput } from 'react-native';
import { connect } from 'react-redux';

import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { createArtikel, updateArtikel } from '../../actions/artikel';

class ArtikelForm extends Component {
  static navigatorStyle = {
    screenBackgroundColor: 'white',
  }
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      token: null,
      data: null,
      // nameImage: null,
      nameImage: this.props.navigation.getParam('artikel') ? this.props.navigation.getParam('artikel').image : null,
      _id: this.props.navigation.getParam('artikel') ? this.props.navigation.getParam('artikel')._id : '',
      title: this.props.navigation.getParam('artikel') ? this.props.navigation.getParam('artikel').title : '',
      text: this.props.navigation.getParam('artikel') ? this.props.navigation.getParam('artikel').text : '',
      image: this.props.navigation.getParam('artikel') ? this.props.navigation.getParam('artikel').image : null,
    };
  }

  async componentWillMount() {
    this.setState({ token: await AsyncStorage.getItem('jwtToken') });
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      _id: nextProps.editartikel._id,
      title: nextProps.editartikel.title,
      image: nextProps.editartikel.image,
      text: nextProps.editartikel.text,
      errors: nextProps.errorss,
    });
  }
  async upload() {
    const token = this.state.token.split('"');
    console.log(token[1]);
    if (this.state._id) {
      this.props.updateArtikel(this.state._id, token[1], this.state.title, this.state.text, this.state.nameImage, this.state.data)
        .then(this.props.navigation.goBack());
    } else {
      this.props.createArtikel(token[1], this.state.title, this.state.text, this.state.nameImage, this.state.data)
        .then(this.props.navigation.goBack());
    }
  }
  show() {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.images()],
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
          nameImage: res.fileName,
        });
      }
    });
  }

  handleChange = (aoeu) => {
    this.setState({ title: aoeu });
    console.log(this.state.title, 'onchange');
  }
  render() {
    let img = this.state.avatarSource == null ? null : (<Image 
      // source={this.state.avatarSource}
      source={{ uri: this.state.avatarSource }}
      style={{ height: 200, width: 200 }}
    />);
    if (img == null) {
      img = this.state.image === null ? null : (<Image 
        source={{ uri: `http://10.0.3.2:3000/uploads/thumb_250/${this.state.image}` }}
        style={{ height: 200, width: 200 }}
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
            <Label>Isi Artikel</Label>
            <Textarea
              value={this.state.text}
              rowSpan={5} bordered placeholder="Textarea"
              onChangeText={
                (text) => {
                  this.setState({ text });
                }
              }
            />
            <TouchableOpacity 
              onPress={this.show.bind(this)}
            >
              <Text>Show Image Picker</Text>
            </TouchableOpacity>
            {img}
            <TouchableOpacity
              onPress={this.upload.bind(this)}
            >
              <Text>Upload Image</Text>
            </TouchableOpacity>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default connect(null, { createArtikel, updateArtikel })(ArtikelForm);
