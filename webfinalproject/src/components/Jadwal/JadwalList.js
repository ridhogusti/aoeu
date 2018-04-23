import React, { Component } from 'react';

class JadwalList extends Component {
  render() {
    const { jadwal, nomor } = this.props;
    return (
      <tr>
        <td>{nomor + 1}</td>
        <td>{jadwal.tanggal}</td>
        <td>{jadwal.waktu}</td>
        <td>{jadwal.author.name}</td>
        <td>{jadwal.tema}</td>
        <td>{jadwal.tempat}</td>
      </tr>
      
    );
  }
}

export default JadwalList;
