/**
 * User controller
 */

import Joi from 'joi';
import HTTPStatus from 'http-status';

import { filteredBody } from '../utils/filteredBody';
import constants from '../config/constants';
import User from '../models/user.model';

export const validation = {
  create: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
        .required(),
      username: Joi.string()
        .min(3)
        .max(20)
        .required(),
    },
  },
};

/**
 * @api {post} /users/signup Create a user
 * @apiDescription Create a user
 * @apiName createUser
 * @apiGroup User
 *
 * @apiParam (Body) {String} email User email.
 * @apiParam (Body) {String} password User password.
 * @apiParam (Body) {String} username User username.
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {String} _id User _id.
 * @apiSuccess {String} token Authentication token.
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 *  _id: '123',
 *  token: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio',
 * }
 *
 * @apiErrorExample {json} Error
 *  HTTP/1.1 400 Bad Request
 *
 *  {
 *    email: 'email is required'
 *  }
 */
export async function create(req, res, next) {
  console.log('test');
  console.log(req.body);

  const body = filteredBody(req.body, constants.WHITELIST.users.create);
  console.log(body, 'ini body bro');
  try {
    const user = await User.create(body);
    return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

export async function getUstadz(req, res, next) {
  try {
    const promise = await Promise.all([
      User.listUstadz({ skip: req.query.skip, limit: req.query.limit }),
    ]);
    const ustadzs = promise[0].reduce((arr, ustadz) => {
      arr.push({
        ...ustadz.toJSON2(),
      });
      return arr;
    }, []);
    // console.log(ustadzs, 'data bro');
    return res.status(HTTPStatus.OK).json(
      ustadzs
    );
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function limitUmum(req, res, next) {
  try {
    console.log(req.params.limit, 'ini limit');
    const promise = await Promise.all([
      User.listLimitUmum(parseInt(req.params.limit)),
    ]);
    // console.log(...promise[0], 'data bro');

    const users = promise[0].reduce((arr, user) => {
      arr.push({
        ...user.toJSON(),
      });
      return arr;
    }, []);
    // console.log(artikels, 'data bro');

    return res.status(HTTPStatus.OK).json(
      users
    );

    // return res.status(HTTPStatus.OK).json(
    //   ...promise[0]
    // );
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}
