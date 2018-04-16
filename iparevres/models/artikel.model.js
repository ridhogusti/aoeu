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
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
    },
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

  createArtikel(args, authorId) {
    return this.create({
      ...args,
      author: authorId,
    });
  },

  // ambil semua artikel
  list({ skip = 0, limit = 10 } = {}) {
    return this.find()
      .sort({ createAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author');
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
      author: this.author,
      createdAt: this.createdAt,
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
