/* eslint-disable import/no-mutable-exports */

import mongoose, { Schema } from 'mongoose';
import slug from 'slug';

const TentangSchema = new Schema(
  {
    telpon: {
      type: String,
      trim: true,
    },
    alamat: {
      type: String,
      trim: true,
    },
    tanggallahir: {
      type: String,
      trim: true,
    },
    pekerjaan: {
      type: Array,
    },
    pendidikan: {
      type: Array,
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
      email: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

TentangSchema.statics = {
  // tambah audio

  createTentang(args, authorId, authorName, authorUsername, authorEmail) {
    console.log(args, 'create tentang');
    return this.create({
      ...args,
      author: {
        _id: authorId,
        name: authorName,
        username: authorUsername,
        email: authorEmail,
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
      .sort({ tanggal: -1 })
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

TentangSchema.methods = {
  slugify() {
    this.slug = slug(this.title);
  },

  toJSON() {
    return {
      _id: this._id,
      telpon: this.telpon,
      alamat: this.alamat,
      tanggallahir: this.tanggallahir,
      pekerjaan: this.pekerjaan,
      pendidikan: this.pendidikan,
      author: {
        _id: this.author._id,
        name: this.author.name,
        username: this.author.username,
        email: this.author.email,
      },
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  },
};

let Tentang;

try {
  Tentang = mongoose.model('Tentang');
} catch (e) {
  Tentang = mongoose.model('Tentang', TentangSchema);
}

export default Tentang;
