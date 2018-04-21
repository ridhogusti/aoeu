import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

class ArtikelApi {
  constructor() {
    this.path = '/artikels';
  }

  async getAllArtikels() {
    try {
      // const { data } = await axios.get(this.path);
      const { data } = await axios.get(this.path);
      console.log(data);
      return data;
    } catch (e) {
      return e;
    }
  }

  async createArtikel(args) {
    try {
      console.log('masue aguen');
      const { data } = await axios.post(this.path, args);
      console.log(data, 'aoentuh');
      return data;
    } catch (e) {
      console.log(e, 'aoenuth');
      return e;
    }
  }

  async updatePhone(args) {
    console.log(args);
    try {
      return await axios.put(`${this.path}/${args._id}`, args);
    } catch (e) {
      return e;
    }
  }

  async deletedPhone(id) {
    try {
      return await axios.delete(`${this.path}/${id}`);
    } catch (e) {
      return e;
    }
  }
}

export default new ArtikelApi();
