/**
 * Post Routes
 */

// import { Router } from 'express';
// import validate from 'express-validation';
import HTTPStatus from 'http-status';

import * as JadwalController from '../controllers/jadwal.controller';
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
router.get('/:username', JadwalController.getByUsername);
router.get('/ambil/:id', JadwalController.getById);
router.get('/:limit/umum', JadwalController.limitUmum);
router.get('/:limit/:username', JadwalController.limit);
router.get('/', JadwalController.getList);
router.post(
  '/',
  authJwt,
  // validate(ArtikelController.validation.create),
  JadwalController.create,
);
router.put(
  '/:id',
  authJwt,
  // validate(ArtikelController.validation.update),
  JadwalController.updateJadwal,
);
router.delete('/:id', authJwt, JadwalController.deleteJadwal);

router.all('*', (req, res, next) => {
  next(new APIError('Not Found!', HTTPStatus.NOT_FOUND, true));
});

router.use(logErrorService);

module.exports = router;

