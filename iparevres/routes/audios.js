/**
 * Post Routes
 */

// import { Router } from 'express';
// import validate from 'express-validation';
import HTTPStatus from 'http-status';

import * as AudioController from '../controllers/audio.controller';
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
router.get('/:username', AudioController.getByUsername);
router.get('/ambil/:id', AudioController.getById);
router.get('/:limit/umum', AudioController.limitUmum);
router.get('/:limit/:username', AudioController.limit);
router.get('/', AudioController.getList);
router.post(
  '/',
  authJwt,
  // validate(ArtikelController.validation.create),
  AudioController.create,
);
router.put(
  '/:id',
  authJwt,
  // validate(ArtikelController.validation.update),
  AudioController.updateAudio,
);
router.delete('/:id', authJwt, AudioController.deleteAudio);

router.all('*', (req, res, next) => {
  next(new APIError('Not Found!', HTTPStatus.NOT_FOUND, true));
});

router.use(logErrorService);

module.exports = router;

