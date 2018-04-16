/**
 * Post Controller
 */

import Joi from 'joi';
import HTTPStatus from 'http-status';

import contants from '../config/constants';

import { filteredBody } from '../utils/filteredBody';
import Artikel from '../models/artikel.model';
import User from '../models/user.model';

const gm = require('gm').subClass({ imageMagick: true });
const fs = require('fs');

export const validation = {
  create: {
    body: {
      title: Joi.string()
        .min(3)
        .required(),
      text: Joi.string().required(),
      image: Joi.string(),
    },
  },
  update: {
    body: {
      title: Joi.string().min(3),
      text: Joi.string(),
      image: Joi.string(),
    },
  },
};

export async function getList(req, res, next) {
  try {
    const promise = await Promise.all([
      User.findById(req.user._id),
      Artikel.list({ skip: req.query.skip, limit: req.query.limit }),
    ]);

    const artikels = promise[1].reduce((arr, post) => {
      arr.push({
        ...post.toJSON(),
      });

      return arr;
    }, []);

    return res.status(HTTPStatus.OK).json(artikels);
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const promise = await Promise.all([
      User.findById(req.user._id),
      Artikel.findById(req.params.id).populate('author'),
    ]);
    return res.status(HTTPStatus.OK).json({
      ...promise[1].toJSON(),
    });
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function create(req, res, next) {
  const ambilNamaImage = req.files.image.path.split('/');
  let tambahImage;
  let body;
  if (req.files.image.type === 'video/mp4') {
    fs.rename(req.files.image.path, `${req.files.image.path}.mp4`, val => {
      console.log(val);
    });
    tambahImage = { ...req.fields, image: `${ambilNamaImage[10]}.mp4` };
    body = filteredBody(tambahImage, contants.WHITELIST.artikels.create);
  } else {
    fs.rename(req.files.image.path, `${req.files.image.path}.jpg`, val => {
      console.log(val);
    });
    tambahImage = { ...req.fields, image: `${ambilNamaImage[10]}.jpg` };
    body = filteredBody(tambahImage, contants.WHITELIST.artikels.create);
    gm(`${req.files.image.path}.jpg`)
      .resize(250, 250)
      .noProfile()
      .write(`./public/uploads/thumb_250/${ambilNamaImage[10]}.jpg`, (err) => {
        if (!err) {
          console.log('berhasil');
        } else {
          console.log(err);
        }
      });
  }

  try {
    return res
      .status(HTTPStatus.CREATED)
      .json(await Artikel.createArtikel(body, req.user._id));
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

export async function deleteArtikel(req, res, next) {
  try {
    const artikel = await Artikel.findById(req.params.id);

    if (artikel.author.toString() !== req.user._id.toString()) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
    await artikel.remove();
    return res.sendStatus(HTTPStatus.OK);
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function updateArtikel(req, res, next) {
  // const body = filteredBody(req.body, contants.WHITELIST.artikels.update);
  if (req.files.image == null) {
    console.log(req.files, 'aeouh');
    console.log(req.files.image == null);
    const body = filteredBody(req.fields, contants.WHITELIST.artikels.update);

    try {
      const artikel = await Artikel.findById(req.params.id);

      if (artikel.author.toString() !== req.user._id.toString()) {
        return res.sendStatus(HTTPStatus.UNAUTHORIZED);
      }

      Object.keys(body).forEach(key => {
        artikel[key] = body[key];
      });

      return res.status(HTTPStatus.OK).json(await artikel.save());
    } catch (err) {
      err.status = HTTPStatus.BAD_REQUEST;
      return next(err);
    }
  } else {
    const ambilNamaImage = req.files.image.path.split('/');
    fs.rename(req.files.image.path, `${req.files.image.path}.jpg`, val => {
      console.log(val);
    });

    const tambahImage = { ...req.fields, image: `${ambilNamaImage[10]}.jpg` };

    const body = filteredBody(tambahImage, contants.WHITELIST.artikels.update);
    gm(`${req.files.image.path}.jpg`)
      .resize(250, 250)
      .noProfile()
      .write(`./public/uploads/thumb_250/${ambilNamaImage[10]}.jpg`, (err) => {
        if (!err) {
          console.log('berhasil');
        } else {
          console.log(err);
        }
      });
    console.log(body, 'aoeuuu');

    try {
      const artikel = await Artikel.findById(req.params.id);

      if (artikel.author.toString() !== req.user._id.toString()) {
        return res.sendStatus(HTTPStatus.UNAUTHORIZED);
      }

      Object.keys(body).forEach(key => {
        artikel[key] = body[key];
      });

      return res.status(HTTPStatus.OK).json(await artikel.save());
    } catch (err) {
      err.status = HTTPStatus.BAD_REQUEST;
      return next(err);
    }
  }
}

