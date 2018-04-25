/* eslint-disable import/no-mutable-exports */

import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import slug from 'slug';

const TanyaSchema = new Schema(
  {
    tanya: {
      type: String,
      required: [true, 'Tanya is required!'],
      minlength: [3, 'Tema must be longer!'],
    },
    jawab: {
      type: String,
      // required: [true, 'Tempat is required!'],
      // minlength: [3, 'Tempat must be longer!'],
    },
    ustadz: {
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
    umat: {
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

TanyaSchema.statics = {
  // tambah audio

  createTanya(args, umatt, ustadzz) {
    console.log(args, 'create Tanya');
    return this.create({
      ...args,
      ustadz: {
        ...ustadzz,
      },
      umat: {
        ...umatt,
      },
    });
  },

  // ambil semua audio
  list({ skip = 0, limit = 4 } = {}) {
    return this.find()
      // .sort({ createdAt: -1 })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  },

  listById({ skip = 0, limit = 10 } = {}, id) {
    return this.find({ _id: mongoose.Types.ObjectId(id) })
      .sort({ createAt: -1 })
      .skip(skip)
      .limit(limit);
  },

  listByUsernameustadz({ skip = 0, limit = 4 } = {}, username) {
    return this.find({ 'ustadz.username': username })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  },
  listByUsernameumat({ skip = 0, limit = 4 } = {}, id, username) {
    return this.find({ 'umat._id': id, 'ustadz.username': username })
      .sort({ createdAt: -1 })
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

TanyaSchema.methods = {
  slugify() {
    this.slug = slug(this.title);
  },

  toJSON() {
    return {
      _id: this._id,
      tanya: this.tanya,
      jawab: this.jawab,
      umat: {
        _id: this.umat._id,
        name: this.umat.name,
        username: this.umat.username,
      },
      ustadz: {
        _id: this.ustadz._id,
        name: this.ustadz.name,
        username: this.ustadz.username,
      },
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  },
};

let Tanya;

try {
  Tanya = mongoose.model('Tanya');
} catch (e) {
  Tanya = mongoose.model('Tanya', TanyaSchema);
}

export default Tanya;
