/**
 * Post Routes
 */

// import { Router } from 'express';
// import validate from 'express-validation';
import HTTPStatus from 'http-status';

import * as VideoController from '../controllers/video.controller';
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
router.get('/:username', VideoController.getByUsername);
router.get('/ambil/:id', VideoController.getById);
router.get('/:limit/umum', VideoController.limitUmum);
router.get('/:limit/:username', VideoController.limit);
router.get('/', VideoController.getList);
router.post(
  '/',
  authJwt,
  // validate(ArtikelController.validation.create),
  VideoController.create,
);
router.put(
  '/:id',
  authJwt,
  // validate(ArtikelController.validation.update),
  VideoController.updateVideo,
);
router.delete('/:id', authJwt, VideoController.deleteVideo);

router.all('*', (req, res, next) => {
  next(new APIError('Not Found!', HTTPStatus.NOT_FOUND, true));
});

router.use(logErrorService);

module.exports = router;

