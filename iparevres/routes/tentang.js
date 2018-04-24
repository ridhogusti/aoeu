/**
 * Post Routes
 */

// import { Router } from 'express';
// import validate from 'express-validation';
import HTTPStatus from 'http-status';

import * as TentangController from '../controllers/tentang.controller';
import { authJwt } from '../services/auth';
import APIError from '../services/error';
import logErrorService from '../services/log';

// const routes = new Router();

const express = require('express');

const router = express.Router();
/**
 * CRUD
 */

router.get('/:username', 
// authJwt, 
  TentangController.getByUsername);
router.post(
  '/',
  authJwt,
  // validate(ArtikelController.validation.create),
  TentangController.create,
);

router.put('/pekerjaan/:index', authJwt, // validate(ArtikelController.validation.update),
  TentangController.updatePekerjaan,
);
router.put('/pendidikan/:index', authJwt, // validate(ArtikelController.validation.update),
  TentangController.updatePendidikan,
);
router.put(
  '/',
  authJwt,
  // validate(ArtikelController.validation.update),
  TentangController.updateTentang,
);
router.delete('/pekerjaan/:index', authJwt, TentangController.deletePekerjaan);
router.delete('/pendidikan/:index', authJwt, TentangController.deletePendidikan);

router.all('*', (req, res, next) => {
  next(new APIError('Not Found!', HTTPStatus.NOT_FOUND, true));
});

router.use(logErrorService);

module.exports = router;

