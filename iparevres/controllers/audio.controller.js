/**
 * Post Controller
 */

import Joi from 'joi';
import HTTPStatus from 'http-status';

import contants from '../config/constants';

import { filteredBody } from '../utils/filteredBody';
import Audio from '../models/audio.model';
// import User from '../models/user.model';

const fs = require('fs');

export const validation = {
  create: {
    body: {
      title: Joi.string()
        .min(3)
        .required(),
      audio: Joi.string(),
    },
  },
  update: {
    body: {
      title: Joi.string().min(3),
      audio: Joi.string(),
    },
  },
};

export async function getList(req, res, next) {
  try {
    const promise = await Promise.all([
      // User.findById(req.user._id),
      Audio.list({ skip: req.query.skip, limit: req.query.limit }),
    ]);

    const audios = promise[0].reduce((arr, post) => {
      arr.push({
        ...post.toJSON(),
      });

      return arr;
    }, []);

    return res.status(HTTPStatus.OK).json(audios);
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function getByUsername(req, res, next) {
  try {
    const promise = await Promise.all([
      // User.findById(req.user._id),
      Audio.listByUsername({ skip: req.query.skip, limit: req.query.limit }, req.params.username),
    ]);
    const audios = promise[0].reduce((arr, audio) => {
      arr.push({
        ...audio.toJSON(),
      });
      return arr;
    }, []);
    console.log(audios, 'data bro');

    return res.status(HTTPStatus.OK).json(
      audios
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
    const countDoc = Audio.count({ 'author.username': 'ustadzabdulsomad' });
    console.log(countDoc, 'ini jumlah dataaoeu');
    console.log(req.params.limit, 'ini limit');
    const promise = await Promise.all([
      Audio.listLimitUmum(countDoc, parseInt(req.params.limit)),
    ]);
    // console.log(...promise[0], 'data bro');

    const audios = promise[0].reduce((arr, audio) => {
      arr.push({
        ...audio.toJSON(),
      });
      return arr;
    }, []);
    // console.log(artikels, 'data bro');

    return res.status(HTTPStatus.OK).json(
      audios
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
      Audio.listLimit(parseInt(req.params.limit), req.params.username),
    ]);
    console.log(...promise[0], 'data bro');

    const audios = promise[0].reduce((arr, audio) => {
      arr.push({
        ...audio.toJSON(),
      });
      return arr;
    }, []);
    console.log(audios, 'data broo');

    return res.status(HTTPStatus.OK).json(
      audios
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
      Audio.listById({ skip: req.query.skip, limit: req.query.limit }, req.params.id),
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
  let tambahAudio;
  let body;
  if (req.files.audio.type === 'audio/mp3') {
    fs.rename(req.files.audio.path, `./public/audios/${req.files.audio.name}`, val => {
      console.log(val);
    });
    // tambahImage = { ...req.fields, image: `${ambilNamaImage[10]}.mp4` };
    tambahAudio = { ...req.fields, audio: req.files.audio.name };
    body = filteredBody(tambahAudio, contants.WHITELIST.audios.create);
  } else {
    fs.rename(req.files.audio.path, `./public/audios/${req.files.audio.name}`, val => {
      console.log(val);
    });
    // tambahImage = { ...req.fields, image: `${ambilNamaImage[10]}.jpg` };
    tambahAudio = { ...req.fields, audio: req.files.audio.name };
    body = filteredBody(tambahAudio, contants.WHITELIST.audios.create);
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
      .json(await Audio.createAudio(body, req.user._id, req.user.name, req.user.username));
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

export async function deleteAudio(req, res, next) {
  try {
    const audio = await Audio.findById(req.params.id);

    if (audio.author._id.toString() !== req.user._id.toString()) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
    await audio.remove();
    return res.sendStatus(HTTPStatus.OK);
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function updateAudio(req, res, next) {
  // const body = filteredBody(req.body, contants.WHITELIST.artikels.update);
  let tambahAudio;
  let body;
  if (req.files.audio == null) {
    console.log(req.files, 'aeouh');
    console.log(req.files.audio == null);
    body = filteredBody(req.fields, contants.WHITELIST.audios.update);

    try {
      const audio = await Audio.findById(req.params.id);

      if (audio.author._id.toString() !== req.user._id.toString()) {
        return res.sendStatus(HTTPStatus.UNAUTHORIZED);
      }

      Object.keys(body).forEach(key => {
        if (body[key] === 'undefined') {
          audio[key] = audio[key];
        } else {
          audio[key] = body[key];
        }
      });
      return res.status(HTTPStatus.OK).json(await audio.save());
    } catch (err) {
      err.status = HTTPStatus.BAD_REQUEST;
      return next(err);
    }
  } else {
    fs.rename(req.files.audio.path, `./public/audios/${req.files.audio.name}`, val => {
      console.log(val);
    });
    tambahAudio = { ...req.fields, audio: req.files.audio.name };
    body = filteredBody(tambahAudio, contants.WHITELIST.audios.update);
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
    const audio = await Audio.findById(req.params.id);

    if (audio.author._id.toString() !== req.user._id.toString()) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }

    Object.keys(body).forEach(key => {
      audio[key] = body[key];
    });

    return res.status(HTTPStatus.OK).json(await audio.save());
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

