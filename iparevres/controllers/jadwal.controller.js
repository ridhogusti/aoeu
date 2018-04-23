/**
 * Post Controller
 */

import Joi from 'joi';
import HTTPStatus from 'http-status';

import contants from '../config/constants';

import { filteredBody } from '../utils/filteredBody';
import Jadwal from '../models/jadwal.model';

export const validation = {
  create: {
    body: {
      tanggal: Joi.string().required(),
      waktu: Joi.string().required(),
      tema: Joi.string().required(),
      tempat: Joi.string().required(),
    },
  },
  update: {
    body: {
      tanggal: Joi.string().required(),
      waktu: Joi.string().required(),
      tema: Joi.string().required(),
      tempat: Joi.string().required(),
    },
  },
};

export async function getList(req, res, next) {
  try {
    const promise = await Promise.all([
      // User.findById(req.user._id),
      Jadwal.list({ skip: req.query.skip, limit: req.query.limit }),
    ]);

    const jadwals = promise[0].reduce((arr, post) => {
      arr.push({
        ...post.toJSON(),
      });

      return arr;
    }, []);

    return res.status(HTTPStatus.OK).json(jadwals);
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function getByUsername(req, res, next) {
  try {
    const promise = await Promise.all([
      // User.findById(req.user._id),
      Jadwal.listByUsername({ skip: req.query.skip, limit: req.query.limit }, req.params.username),
    ]);
    const jadwals = promise[0].reduce((arr, jadwal) => {
      arr.push({
        ...jadwal.toJSON(),
      });
      return arr;
    }, []);
    console.log(jadwals, 'data bro');

    return res.status(HTTPStatus.OK).json(
      jadwals
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
    const countDoc = Jadwal.count({ 'author.username': 'ustadzabdulsomad' });
    console.log(countDoc, 'ini jumlah dataaoeu');
    console.log(req.params.limit, 'ini limit');
    const promise = await Promise.all([
      Jadwal.listLimitUmum(countDoc, parseInt(req.params.limit)),
    ]);
    // console.log(...promise[0], 'data bro');

    const jadwals = promise[0].reduce((arr, jadwal) => {
      arr.push({
        ...jadwal.toJSON(),
      });
      return arr;
    }, []);
    // console.log(artikels, 'data bro');

    return res.status(HTTPStatus.OK).json(
      jadwals
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
      Jadwal.listLimit(parseInt(req.params.limit), req.params.username),
    ]);
    console.log(...promise[0], 'data bro');

    const jadwals = promise[0].reduce((arr, jadwal) => {
      arr.push({
        ...jadwal.toJSON(),
      });
      return arr;
    }, []);
    console.log(jadwals, 'data broo');

    return res.status(HTTPStatus.OK).json(
      jadwals
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
      Jadwal.listById({ skip: req.query.skip, limit: req.query.limit }, req.params.id),
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
  const tambahJadwal = { ...req.fields };
  const body = filteredBody(tambahJadwal, contants.WHITELIST.jadwals.create);

  try {
    console.log(body);
    return res
      .status(HTTPStatus.CREATED)
      .json(await Jadwal.createJadwal(body, req.user._id, req.user.name, req.user.username));
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

export async function deleteJadwal(req, res, next) {
  try {
    const jadwal = await Jadwal.findById(req.params.id);

    if (jadwal.author._id.toString() !== req.user._id.toString()) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
    await jadwal.remove();
    return res.sendStatus(HTTPStatus.OK);
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function updateJadwal(req, res, next) {
  console.log(req.files, 'aeouh');
  console.log(req.files.jadwal == null);
  const body = filteredBody(req.fields, contants.WHITELIST.jadwals.update);

  try {
    const jadwal = await Jadwal.findById(req.params.id);
    if (jadwal.author._id.toString() !== req.user._id.toString()) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }

    Object.keys(body).forEach(key => {
      if (body[key] === 'undefined') {
        jadwal[key] = jadwal[key];
      } else {
        jadwal[key] = body[key];
      }
    });
    return res.status(HTTPStatus.OK).json(await jadwal.save());
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

