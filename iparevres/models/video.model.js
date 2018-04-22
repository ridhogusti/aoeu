/* eslint-disable import/no-mutable-exports */

import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import slug from 'slug';

const VideoSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Title is required!'],
      minlength: [3, 'Title must be longer!'],
      unique: true,
    },
    video: {
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

VideoSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

VideoSchema.pre('validate', function (next) {
  this.slugify();
  next();
});

VideoSchema.statics = {
  // tambah video

  createVideo(args, authorId, authorName, authorUsername) {
    return this.create({
      ...args,
      author: {
        _id: authorId,
        name: authorName,
        username: authorUsername,
      },
    });
  },

  // ambil semua video
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

VideoSchema.methods = {
  slugify() {
    this.slug = slug(this.title);
  },

  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      video: this.video,
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

let Video;

try {
  Video = mongoose.model('Video');
} catch (e) {
  Video = mongoose.model('Video', VideoSchema);
}

export default Video;
