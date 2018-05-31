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
      // User.findById(req.user._id),
      Artikel.list({ skip: req.query.skip, limit: req.query.limit }),
    ]);

    const artikels = promise[0].reduce((arr, post) => {
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

export async function getCountByUsername(req, res, next) {
  try {
    let jumlah = 0;
    console.log(req.params.username, 'count');
    const count = await Artikel.count({ 'author.username': req.params.username }, (err, result) => {
      jumlah = result;
    });
    console.log(jumlah, 'jumlah count');
    return res.status(HTTPStatus.OK).json(
      jumlah
    );
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function getByUsername(req, res, next) {
  try {
    const promise = await Promise.all([
      // User.findById(req.user._id),
      Artikel.listByUsername({ skip: req.query.skip, limit: req.query.limit }, req.params.username),
    ]);
    const artikels = promise[0].reduce((arr, artikel) => {
      arr.push({
        ...artikel.toJSON(),
      });
      return arr;
    }, []);
    console.log(artikels, 'data bro');

    return res.status(HTTPStatus.OK).json(
      artikels
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
    const countDoc = Artikel.count({ 'author.username': 'ustadzabdulsomad' });
    console.log(countDoc, 'ini jumlah dataaoeu');
    console.log(req.params.limit, 'ini limit');
    const promise = await Promise.all([
      Artikel.listLimitUmum(countDoc, parseInt(req.params.limit)),
    ]);
    // console.log(...promise[0], 'data bro');

    const artikels = promise[0].reduce((arr, artikel) => {
      arr.push({
        ...artikel.toJSON(),
      });
      return arr;
    }, []);
    // console.log(artikels, 'data bro');

    return res.status(HTTPStatus.OK).json(
      artikels
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
      Artikel.listLimit(parseInt(req.params.limit), req.params.username),
    ]);
    console.log(...promise[0], 'data bro');

    const artikels = promise[0].reduce((arr, artikel) => {
      arr.push({
        ...artikel.toJSON(),
      });
      return arr;
    }, []);
    console.log(artikels, 'data broo');

    return res.status(HTTPStatus.OK).json(
      artikels
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
      Artikel.listById({ skip: req.query.skip, limit: req.query.limit }, req.params.id),
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
  let tambahImage;
  let body;
  if (req.files.image.type === 'video/mp4') {
    fs.rename(req.files.image.path, `${req.files.image.path}.mp4`, val => {
      console.log(val);
    });
    // tambahImage = { ...req.fields, image: `${ambilNamaImage[10]}.mp4` };
    tambahImage = { ...req.fields, image: req.files.image.name };
    body = filteredBody(tambahImage, contants.WHITELIST.artikels.create);
  } else {
    fs.rename(req.files.image.path, `./public/images/${req.files.image.name}`, val => {
      console.log(val);
    });
    // tambahImage = { ...req.fields, image: `${ambilNamaImage[10]}.jpg` };
    tambahImage = { ...req.fields, image: req.files.image.name };
    body = filteredBody(tambahImage, contants.WHITELIST.artikels.create);
    gm(`./public/images/${req.files.image.name}`)
      .resize(250, 250)
      .noProfile()
      .write(`./public/uploads/thumb_250/${req.files.image.name}`, (err) => {
        if (!err) {
          console.log('berhasil');
        } else {
          console.log(err);
        }
      });
  }

  try {
    console.log(body);
    return res
      .status(HTTPStatus.CREATED)
      .json(await Artikel.createArtikel(body, req.user._id, req.user.name, req.user.username));
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

export async function deleteArtikel(req, res, next) {
  try {
    const artikel = await Artikel.findById(req.params.id);

    if (artikel.author._id.toString() !== req.user._id.toString()) {
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
  let tambahImage;
  let body;
  if (req.files.image == null) {
    console.log(req.files, 'aeouh');
    console.log(req.files.image == null);
    body = filteredBody(req.fields, contants.WHITELIST.artikels.update);

    try {
      const artikel = await Artikel.findById(req.params.id);

      if (artikel.author._id.toString() !== req.user._id.toString()) {
        return res.sendStatus(HTTPStatus.UNAUTHORIZED);
      }

      Object.keys(body).forEach(key => {
        if (body[key] === 'undefined') {
          artikel[key] = artikel[key];
        } else {
          artikel[key] = body[key];
        }
      });
      // Object.keys(body).forEach(key => {
      //   artikel[key] = body[key];
      // });

      return res.status(HTTPStatus.OK).json(await artikel.save());
    } catch (err) {
      err.status = HTTPStatus.BAD_REQUEST;
      return next(err);
    }
  } else {
    fs.rename(req.files.image.path, `./public/images/${req.files.image.name}`, val => {
      console.log(val);
    });
    tambahImage = { ...req.fields, image: req.files.image.name };
    body = filteredBody(tambahImage, contants.WHITELIST.artikels.create);
    gm(`./public/images/${req.files.image.name}`)
      .resize(250, 250)
      .noProfile()
      .write(`./public/uploads/thumb_250/${req.files.image.name}`, (err) => {
        if (!err) {
          console.log('berhasil');
        } else {
          console.log(err);
        }
      });
  }

  try {
    const artikel = await Artikel.findById(req.params.id);

    if (artikel.author._id.toString() !== req.user._id.toString()) {
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

