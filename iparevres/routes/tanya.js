/**
 * Post Routes
 */

// import { Router } from 'express';
// import validate from 'express-validation';
import HTTPStatus from 'http-status';

import * as TanyaController from '../controllers/tanya.controller';
import { authJwt } from '../services/auth';
import APIError from '../services/error';
import logErrorService from '../services/log';

// const routes = new Router();

const express = require('express');

const router = express.Router();
/**
 * CRUD
 */

// router.get('/', authJwt, ArtikelController.getList);
router.get('/:username/:id', authJwt, TanyaController.getByUsername);
// router.get('/ambil/:id', TanyaController.getById);
// router.get('/:limit/umum', TanyaController.limit);
router.get('/:limit/:username', TanyaController.limit);
router.get('/', TanyaController.getList);
router.post(
  '/',
  authJwt,
  // validate(ArtikelController.validation.create),
  TanyaController.create,
);
router.put(
  '/',
  authJwt,
  // validate(ArtikelController.validation.update),
  TanyaController.createJawab,
);
// router.delete('/:id', authJwt, TanyaController.deleteJadwal);

router.all('*', (req, res, next) => {
  next(new APIError('Not Found!', HTTPStatus.NOT_FOUND, true));
});

router.use(logErrorService);

module.exports = router;

