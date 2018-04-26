/**
 * Post Controller
 */

import Joi from 'joi';
import HTTPStatus from 'http-status';

import contants from '../config/constants';

import { filteredBody } from '../utils/filteredBody';
import Video from '../models/video.model';
// import User from '../models/user.model';

const gm = require('gm').subClass({ imageMagick: true });
const fs = require('fs');

export const validation = {
  create: {
    body: {
      title: Joi.string()
        .min(3)
        .required(),
      video: Joi.string(),
    },
  },
  update: {
    body: {
      title: Joi.string().min(3),
      video: Joi.string(),
    },
  },
};
export async function getCountByUsername(req, res, next) {
  try {
    let jumlah = 0;
    const count = await Video.count({ 'author.username': req.params.username }, (err, result) => {
      jumlah = result;
    });
    return res.status(HTTPStatus.OK).json(
      jumlah
    );
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function getList(req, res, next) {
  try {
    const promise = await Promise.all([
      // User.findById(req.user._id),
      Video.list({ skip: req.query.skip, limit: req.query.limit }),
    ]);

    const videos = promise[0].reduce((arr, post) => {
      arr.push({
        ...post.toJSON(),
      });

      return arr;
    }, []);

    return res.status(HTTPStatus.OK).json(videos);
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function getByUsername(req, res, next) {
  try {
    const promise = await Promise.all([
      // User.findById(req.user._id),
      Video.listByUsername({ skip: req.query.skip, limit: req.query.limit }, req.params.username),
    ]);
    const videos = promise[0].reduce((arr, video) => {
      arr.push({
        ...video.toJSON(),
      });
      return arr;
    }, []);
    console.log(videos, 'data bro');
    
    return res.status(HTTPStatus.OK).json(
      videos
    );
    // return res.status(HTTPStatus.OK).json(
    //   ...promise[1].toJSON(),
    // );
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function limitUmum(req, res, next) {
  try {
    const countDoc = Video.count({ 'author.username': 'ustadzabdulsomad' });
    console.log(countDoc, 'ini jumlah dataaoeu');
    console.log(req.params.limit, 'ini limit');
    const promise = await Promise.all([
      Video.listLimitUmum(countDoc, parseInt(req.params.limit)),
    ]);
    // console.log(...promise[0], 'data bro');

    const videos = promise[0].reduce((arr, video) => {
      arr.push({
        ...video.toJSON(),
      });
      return arr;
    }, []);
    // console.log(artikels, 'data bro');

    return res.status(HTTPStatus.OK).json(
      videos
    );

    // return res.status(HTTPStatus.OK).json(
    //   ...promise[0]
    // );
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function limit(req, res, next) {
  try {
    console.log(req.params.limit, 'ini limitaa');
    const promise = await Promise.all([
      Video.listLimit(parseInt(req.params.limit), req.params.username),
    ]);
    console.log(...promise[0], 'data bro');

    const videos = promise[0].reduce((arr, video) => {
      arr.push({
        ...video.toJSON(),
      });
      return arr;
    }, []);
    console.log(videos, 'data broo');

    return res.status(HTTPStatus.OK).json(
      videos
    );

    // return res.status(HTTPStatus.OK).json(
    //   ...promise[0]
    // );
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const promise = await Promise.all([
      Video.listById({ skip: req.query.skip, limit: req.query.limit }, req.params.id),
    ]);
    console.log(...promise[0], 'data bro');

    return res.status(HTTPStatus.OK).json(
      ...promise[0]
    );
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function create(req, res, next) {
  console.log('masue bro', req.fields);
  console.log('masue bro', req.files);
  // const ambilNamaImage = req.files.image.path.split('/');
  let tambahVideo;
  let body;
  if (req.files.video.type === 'video/mp4') {
    fs.rename(req.files.video.path, `./public/videos/${req.files.video.name}`, val => {
      console.log(val);
    });
    // tambahImage = { ...req.fields, image: `${ambilNamaImage[10]}.mp4` };
    tambahVideo = { ...req.fields, video: req.files.video.name };
    body = filteredBody(tambahVideo, contants.WHITELIST.videos.create);
  } else {
    fs.rename(req.files.image.path, `./public/images/${req.files.image.name}`, val => {
      console.log(val);
    });
    // tambahImage = { ...req.fields, image: `${ambilNamaImage[10]}.jpg` };
    tambahVideo = { ...req.fields, video: req.files.video.name };
    body = filteredBody(tambahVideo, contants.WHITELIST.videos.create);
    // gm(`./public/images/${req.files.image.name}`)
    //   .resize(250, 250)
    //   .noProfile()
    //   .write(`./public/uploads/thumb_250/${req.files.image.name}`, (err) => {
    //     if (!err) {
    //       console.log('berhasil');
    //     } else {
    //       console.log(err);
    //     }
    //   });
  }

  try {
    console.log(body);
    return res
      .status(HTTPStatus.CREATED)
      .json(await Video.createVideo(body, req.user._id, req.user.name, req.user.username));
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

export async function deleteVideo(req, res, next) {
  try {
    const video = await Video.findById(req.params.id);

    if (video.author._id.toString() !== req.user._id.toString()) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
    await video.remove();
    return res.sendStatus(HTTPStatus.OK);
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function updateVideo(req, res, next) {
  // const body = filteredBody(req.body, contants.WHITELIST.artikels.update);
  let tambahVideo;
  let body;
  if (req.files.video == null) {
    console.log(req.files, 'aeouh');
    console.log(req.files.video == null);
    body = filteredBody(req.fields, contants.WHITELIST.videos.update);

    try {
      const video = await Video.findById(req.params.id);

      if (video.author._id.toString() !== req.user._id.toString()) {
        return res.sendStatus(HTTPStatus.UNAUTHORIZED);
      }

      Object.keys(body).forEach(key => {
        if (body[key] === 'undefined') {
          video[key] = video[key];
        } else {
          video[key] = body[key];
        }
      });
      return res.status(HTTPStatus.OK).json(await video.save());
    } catch (err) {
      err.status = HTTPStatus.BAD_REQUEST;
      return next(err);
    }
  } else {
    fs.rename(req.files.video.path, `./public/videos/${req.files.video.name}`, val => {
      console.log(val);
    });
    tambahVideo = { ...req.fields, video: req.files.video.name };
    body = filteredBody(tambahVideo, contants.WHITELIST.videos.update);
    // gm(`./public/images/${req.files.image.name}`)
    //   .resize(250, 250)
    //   .noProfile()
    //   .write(`./public/uploads/thumb_250/${req.files.image.name}`, (err) => {
    //     if (!err) {
    //       console.log('berhasil');
    //     } else {
    //       console.log(err);
    //     }
    //   });
  }

  try {
    const video = await Video.findById(req.params.id);

    if (video.author._id.toString() !== req.user._id.toString()) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }

    Object.keys(body).forEach(key => {
      console.log(body[key], 'bodi nya');
      video[key] = body[key];
    });

    return res.status(HTTPStatus.OK).json(await video.save());
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

