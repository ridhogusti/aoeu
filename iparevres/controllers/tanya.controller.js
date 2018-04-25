/**
 * Post Controller
 */

import Joi from 'joi';
import HTTPStatus from 'http-status';
import mongoose from 'mongoose';

import contants from '../config/constants';

import { filteredBody } from '../utils/filteredBody';
import Tanya from '../models/tanya.model';
import User from '../models/user.model';

export const validation = {
  create: {
    body: {
      tanya: Joi.string().required(),
      jawab: Joi.string().required(),
    },
  },
  update: {
    body: {
      tanya: Joi.string().required(),
      jawab: Joi.string().required(),
    },
  },
};

export async function getList(req, res, next) {
  try {
    const promise = await Promise.all([
      // User.findById(req.user._id),
      Tanya.list({ skip: req.query.skip, limit: req.query.limit }),
    ]);

    const tanyas = promise[0].reduce((arr, post) => {
      arr.push({
        ...post.toJSON(),
      });

      return arr;
    }, []);

    return res.status(HTTPStatus.OK).json(tanyas);
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function getByUsername(req, res, next) {
  try {
    let promise;
    console.log(req.user);
    if (req.user.akses === 'umat') {
      promise = await Promise.all([
        Tanya.listByUsernameumat({ skip: req.query.skip, limit: req.query.limit }, req.params.id, req.params.username),
      ]);
    } else {
      promise = await Promise.all([
        Tanya.listByUsernameustadz({ skip: req.query.skip, limit: req.query.limit }, req.params.username),
      ]);
    }
    const tanyas = promise[0].reduce((arr, tanya) => {
      arr.push({
        ...tanya.toJSON(),
      });
      return arr;
    }, []);
    console.log(tanyas, 'data bro');

    return res.status(HTTPStatus.OK).json(
      tanyas
    );
    // return res.status(HTTPStatus.OK).json(
    //   ...promise[1].toJSON(),
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
      Tanya.listLimit(parseInt(req.params.limit), req.params.username),
    ]);
    console.log(...promise[0], 'data bro');

    const tanyas = promise[0].reduce((arr, tanya) => {
      arr.push({
        ...tanya.toJSON(),
      });
      return arr;
    }, []);
    console.log(tanyas, 'data broo');

    return res.status(HTTPStatus.OK).json(
      tanyas
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
      Tanya.listById({ skip: req.query.skip, limit: req.query.limit }, req.params.id),
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
  // console.log('masue bro', req.fields);
  // const tambahJadwal = { ...req.fields };
  // const body = filteredBody(tambahJadwal, contants.WHITELIST.jadwals.create);
  const body = {
    tanya: req.body.tanya,
    jawab: '',
  };
  const ustadz = await User.findOne({ username: req.body.username });
  console.log(ustadz, 'username');
  const umat = {
    _id: req.user._id,
    name: req.user.name,
    username: req.user.username,
  };
  const ustadzz = {
    _id: ustadz._id,
    name: ustadz.name,
    username: ustadz.username,
  };

  try {
    console.log(body);
    return res
      .status(HTTPStatus.CREATED)
      .json(await Tanya.createTanya(body, umat, ustadzz));
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

// export async function deleteJadwal(req, res, next) {
//   try {
//     const jadwal = await Jadwal.findById(req.params.id);

//     if (jadwal.author._id.toString() !== req.user._id.toString()) {
//       return res.sendStatus(HTTPStatus.UNAUTHORIZED);
//     }
//     await jadwal.remove();
//     return res.sendStatus(HTTPStatus.OK);
//   } catch (err) {
//     err.status = HTTPStatus.BAD_REQUEST;
//     return next(err);
//   }
// }

export async function createJawab(req, res, next) {
  // const body = filteredBody(req.fields, contants.WHITELIST.jadwals.update);
  // console.log('object', req.body.idtanya);
  // console.log('aoeueu');

  try {
    const tanya = await Tanya.findOne({ _id: mongoose.Types.ObjectId(req.body.idtanya) });
    console.log(tanya, 'auu');
    const jawab = await Tanya.findOne({ 'ustadz._id': mongoose.Types.ObjectId(req.user._id) });
    if (jawab.ustadz._id.toString() !== req.user._id.toString()) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }

    console.log(req.body.jawab);

    Object.keys(req.body).forEach(key => {
      if (key === 'jawab') {
        tanya[key] = req.body[key];
      } else {
        tanya[key] = tanya[key];
      }
    });
    return res.status(HTTPStatus.OK).json(await tanya.save());
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

