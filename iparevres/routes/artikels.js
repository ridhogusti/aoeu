/**
 * Post Routes
 */

// import { Router } from 'express';
// import validate from 'express-validation';
import HTTPStatus from 'http-status';

import * as ArtikelController from '../controllers/artikel.controller';
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
router.get('/:username', ArtikelController.getByUsername);
router.get('/:username/count', ArtikelController.getCountByUsername);
router.get('/ambil/:id', ArtikelController.getById);
router.get('/:limit/umum', ArtikelController.limitUmum);
router.get('/:limit/:username', ArtikelController.limit);
router.get('/', ArtikelController.getList);
router.post(
  '/',
  authJwt,
  // validate(ArtikelController.validation.create),
  ArtikelController.create,
);
router.put(
  '/:id',
  authJwt,
  // validate(ArtikelController.validation.update),
  ArtikelController.updateArtikel,
);
router.delete('/:id', authJwt, ArtikelController.deleteArtikel);

router.all('*', (req, res, next) => {
  next(new APIError('Not Found!', HTTPStatus.NOT_FOUND, true));
});

router.use(logErrorService);

module.exports = router;

