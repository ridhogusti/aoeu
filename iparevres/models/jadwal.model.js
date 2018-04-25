/* eslint-disable import/no-mutable-exports */

import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import slug from 'slug';

const JadwalSchema = new Schema(
  {
    tema: {
      type: String,
      trim: true,
      required: [true, 'Tema is required!'],
      minlength: [3, 'Tema must be longer!'],
    },
    tempat: {
      type: String,
      trim: true,
      required: [true, 'Tempat is required!'],
      minlength: [3, 'Tempat must be longer!'],
    },
    waktu: {
      type: String,
      required: [true, 'Tanggal is required!'],
    },
    tanggal: {
      type: String,
      required: [true, 'Tanggal is required!'],
    },
    author: {
      _id: {
        type: Schema.Types.ObjectId,
      },
      name: {
        type: String,
      },
      username: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

JadwalSchema.statics = {
  // tambah audio

  createJadwal(args, authorId, authorName, authorUsername) {
    console.log(args, 'create jadwal');
    return this.create({
      ...args,
      author: {
        _id: authorId,
        name: authorName,
        username: authorUsername,
      },
    });
  },

  // ambil semua audio
  list({ skip = 0, limit = 4 } = {}) {
    return this.find()
      // .sort({ createdAt: -1 })
      .sort({ tanggal: -1, waktu: -1 })
      .skip(skip)
      .limit(limit);
  },

  listById({ skip = 0, limit = 10 } = {}, id) {
    return this.find({ _id: mongoose.Types.ObjectId(id) })
      .sort({ createAt: -1 })
      .skip(skip)
      .limit(limit);
  },
  listByUsername({ skip = 0, limit = 4 } = {}, username) {
    return this.find({ 'author.username': username })
      .sort({ tanggal: -1, waktu: -1 })
      .skip(skip)
      .limit(limit);
  },
  listLimit(limit, username) {
    return this.find({ 'author.username': username })
      .sort({ tanggal: -1, waktu: -1 })
      .skip(4 + limit)
      .limit(4);
  },
  listLimitUmum(countDoc, limit) {
    return this.find()
      .sort({ tanggal: -1, waktu: -1 })
      .skip(4 + limit)
      .limit(4);
  },
};

JadwalSchema.methods = {
  slugify() {
    this.slug = slug(this.title);
  },

  toJSON() {
    return {
      _id: this._id,
      tema: this.tema,
      tanggal: this.tanggal,
      waktu: this.waktu,
      tempat: this.tempat,
      author: {
        _id: this.author._id,
        name: this.author.name,
        username: this.author.username,
      },
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  },
};

let Jadwal;

try {
  Jadwal = mongoose.model('Jadwal');
} catch (e) {
  Jadwal = mongoose.model('Jadwal', JadwalSchema);
}

export default Jadwal;
