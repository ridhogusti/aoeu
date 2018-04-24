/**
 * Post Controller
 */

import Joi from 'joi';
import HTTPStatus from 'http-status';

import mongoose from 'mongoose';
import contants from '../config/constants';

import { filteredBody } from '../utils/filteredBody';
import Tentang from '../models/tentang.model';

export const validation = {
  create: {
    body: {
      telpon: Joi.string().required(),
      alamat: Joi.string().required(),
      tanggallahir: Joi.string().required(),
      pekerjaan: Joi.string().required(),
      pendidikan: Joi.string().required(),
    },
  },
  update: {
    body: {
      telpon: Joi.string().required(),
      alamat: Joi.string().required(),
      tanggallahir: Joi.string().required(),
      pekerjaan: Joi.string().required(),
      pendidikan: Joi.string().required(),
    },
  },
};

export async function getList(req, res, next) {
  try {
    const promise = await Promise.all([
      // User.findById(req.user._id),
      Tentang.list({ skip: req.query.skip, limit: req.query.limit }),
    ]);

    const tentangs = promise[0].reduce((arr, post) => {
      arr.push({
        ...post.toJSON(),
      });

      return arr;
    }, []);

    return res.status(HTTPStatus.OK).json(tentangs);
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function getByUsername(req, res, next) {
  try {
    // const promise = await Promise.all([
    //   // User.findById(req.user._id),
    //   Tentang.listByUsername({ skip: req.query.skip, limit: req.query.limit }, req.params.username),
    // ]);

    const tentang = await Tentang.findOne({ 'author.username': req.params.username });
    // const tentangs = promise[0].reduce((arr, tentang) => {
    //   arr.push({
    //     ...tentang.toJSON(),
    //   });
    //   return arr;
    // }, []);
    // console.log(tentangs, 'data bro');

    return res.status(HTTPStatus.OK).json(
      tentang
    );
    // return res.status(HTTPStatus.OK).json(
    //   ...promise[1].toJSON(),
    // );
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function create(req, res, next) {
  console.log('masue bro', req.fields);
  const tambahTentang = { ...req.fields };
  // const body = filteredBody(tambahJadwal, contants.WHITELIST.jadwals.create);

  try {
    console.log(tambahTentang);
    return res
      .status(HTTPStatus.CREATED)
      .json(await Tentang.createJadwal(tambahTentang, req.user._id, req.user.name, req.user.username, req.user.email));
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

export async function deletePendidikan(req, res, next) {
  try {
    const tentang = await Tentang.findOne({ 'author._id': mongoose.Types.ObjectId(req.user._id) });

    if (tentang.author._id.toString() !== req.user._id.toString()) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
    const body = {
      pendidikan: req.params.index,
    };

    Object.keys(body).forEach(key => {
      if (key === 'pendidikan') {
        console.log(key, 'key nya');
        console.log(body[key], 'isi nya');
        tentang.pendidikan.splice(body[key], 1);
      } 
    });
    return res.status(HTTPStatus.OK).json(await tentang.save());
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function updatePendidikan(req, res, next) {
  try {
    const tentang = await Tentang.findOne({ 'author._id': mongoose.Types.ObjectId(req.user._id) });

    if (tentang.author._id.toString() !== req.user._id.toString()) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
    const body = {
      pendidikann: req.params.index,
    };

    Object.keys(body).forEach(key => {
      if (key === 'pendidikann') {
        console.log(key, 'key nya');
        console.log(body[key], 'isi nya');
        console.log(req.body.pendidikan);
        tentang.pendidikan.splice(body[key], 1, req.body.pendidikan);
      } 
    });
    return res.status(HTTPStatus.OK).json(await tentang.save());
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}
export async function updatePekerjaan(req, res, next) {
  try {
    const tentang = await Tentang.findOne({ 'author._id': mongoose.Types.ObjectId(req.user._id) });

    if (tentang.author._id.toString() !== req.user._id.toString()) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
    const body = {
      pekerjaann: req.params.index,
    };

    Object.keys(body).forEach(key => {
      if (key === 'pekerjaann') {
        console.log(key, 'key nya');
        console.log(body[key], 'isi nya');
        tentang.pekerjaan.splice(body[key], 1, req.body.pekerjaan);
      } 
    });
    return res.status(HTTPStatus.OK).json(await tentang.save());
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}
export async function deletePekerjaan(req, res, next) {
  try {
    const tentang = await Tentang.findOne({ 'author._id': mongoose.Types.ObjectId(req.user._id) });

    if (tentang.author._id.toString() !== req.user._id.toString()) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
    const body = {
      pekerjaan: req.params.index,
    };

    Object.keys(body).forEach(key => {
      if (key === 'pekerjaan') {
        console.log(key, 'key nya');
        console.log(body[key], 'isi nya');
        tentang.pekerjaan.splice(body[key], 1);
      } 
    });
    return res.status(HTTPStatus.OK).json(await tentang.save());
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function updateTentang(req, res, next) {
  // console.log(req.files, 'aeouh');
  // console.log(req.files.jadwal == null);
  // const body = filteredBody(req.fields, contants.WHITELIST.jadwals.update);
  // const body = req.fields;

  const tentang = await Tentang.findOne({ 'author._id': mongoose.Types.ObjectId(req.user._id) });

  console.log(tentang, 'tentang');
  // console.log(req.user, 'isi user');

  if (tentang == null) {
    const body = {
      telpon: req.body.telpon ? req.body.telpon : '',
      alamat: req.body.alamat ? req.body.alamat : '',
      tanggallahir: req.body.tanggallahir ? req.body.tanggallahir : '',
      pekerjaan: req.body.pekerjaan ? req.body.pekerjaan : [],
      pendidikan: req.body.pendidikan ? req.body.pendidikan : [],
    };
    console.log(body, 'isi body nya');
    try {
    // const tentang = await Tentang.findOne({ 'author.id': req.params.id);
      console.log(tentang, 'tentang null'); 
      return res
        .status(HTTPStatus.CREATED)
        .json(await Tentang.createTentang(body, req.user._id, req.user.name, req.user.username, req.user.email));
    } catch (err) {
      err.status = HTTPStatus.BAD_REQUEST;
      return next(err);
    }
  } else {
    if (tentang.author._id.toString() !== req.user._id.toString()) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }

    const test = ['aoeu'];
    test.push('asnoeth');

    console.log(test, 'ini test bro');
    Object.keys(req.body).forEach(key => {
      if (key === 'pekerjaan') {
        if (req.body[key] == '') {
          tentang[key] = tentang[key];
        } else {
          console.log(key, 'key nya');
          console.log(req.body[key], 'isi nya');
          tentang.pekerjaan.push(req.body[key]);
        // tentang[key] = tentang.pekerjaan.push('uau');
        }
      } else if (key === 'pendidikan') {
        if (req.body[key] === '') {
          tentang[key] = tentang[key];
        } else {
          console.log(key, 'key nya');
          console.log(req.body[key], 'isi nya');
          tentang.pendidikan.push(req.body[key]);
        // tentang[key] = tentang.pekerjaan.push('uau');
        }
      } else {
        console.log(tentang.pekerjaan, ' pekerjaan');
        tentang[key] = req.body[key];
        console.log('aeou');
      }
    });
    console.log(tentang, 'tentang yang di bawah');
    return res.status(HTTPStatus.OK).json(await tentang.save());
  } 
}

