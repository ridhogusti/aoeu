// import validate from 'express-validation';
import HTTPStatus from 'http-status';
import * as UserController from '../controllers/user.controller';

import * as AuthenticationController from '../controllers/authentication.controller';
import { authLocal } from '../services/auth';
import APIError from '../services/error';
import logErrorService from '../services/log';

const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.post('/signup', 
  // validate(UserController.validation.create),
  UserController.create);
router.post(
  '/login',
  // validate(AuthenticationController.validation.login),
  authLocal,
  AuthenticationController.login,
);

router.all('*', (req, res, next) => {
  next(new APIError('Not Found!', HTTPStatus.NOT_FOUND, true));
});

router.use(logErrorService);
module.exports = router;
