/* eslint-disable import/no-mutable-exports */

import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import slug from 'slug';

const ArtikelSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Title is required!'],
      minlength: [3, 'Title must be longer!'],
      unique: true,
    },
    text: {
      type: String,
      required: [true, 'Some text are required'],
    },
    image: {
      type: String,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
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
    // author: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: [true, 'Author is required'],
    // },
  },
  { timestamps: true }
);

ArtikelSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

ArtikelSchema.pre('validate', function (next) {
  this.slugify();
  next();
});

ArtikelSchema.statics = {
  // tambah artikel

  createArtikel(args, authorId, authorName, authorUsername) {
    return this.create({
      ...args,
      author: {
        _id: authorId,
        name: authorName,
        username: authorUsername,
      },
    });
  },

  // ambil semua artikel
  list({ skip = 0, limit = 4 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  },

  listById({ skip = 0, limit = 10 } = {}, id) {
    console.log(id, 'iasnoeu');
    return this.find({ _id: mongoose.Types.ObjectId(id) })
      .sort({ createAt: -1 })
      .skip(skip)
      .limit(limit);
  },
  listByUsername({ skip = 0, limit = 4 } = {}, username) {
    return this.find({ 'author.username': username })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  },
  listLimit(limit, username) {
    return this.find({ 'author.username': username })
      .sort({ createdAt: -1 })
      .skip(4 + limit)
      .limit(4);
  },
  listLimitUmum(countDoc, limit) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(4 + limit)
      .limit(4);
  },
};

ArtikelSchema.methods = {
  slugify() {
    this.slug = slug(this.title);
  },

  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      text: this.text,
      image: this.image,
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

let Artikel;

try {
  Artikel = mongoose.model('Artikel');
} catch (e) {
  Artikel = mongoose.model('Artikel', ArtikelSchema);
}

export default Artikel;
