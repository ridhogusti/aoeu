/* eslint-disable import/no-mutable-exports */

import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import slug from 'slug';

const AudioSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Title is required!'],
      minlength: [3, 'Title must be longer!'],
      unique: true,
    },
    audio: {
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
  },
  { timestamps: true }
);

AudioSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

AudioSchema.pre('validate', function (next) {
  this.slugify();
  next();
});

AudioSchema.statics = {
  // tambah audio

  createAudio(args, authorId, authorName, authorUsername) {
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

AudioSchema.methods = {
  slugify() {
    this.slug = slug(this.title);
  },

  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      audio: this.audio,
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

let Audio;

try {
  Audio = mongoose.model('Audio');
} catch (e) {
  Audio = mongoose.model('Audio', AudioSchema);
}

export default Audio;
