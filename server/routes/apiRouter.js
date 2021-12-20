import express from 'express';
import cookieParser from 'cookie-parser';

import moviesRouter from './moviesRouter';

const router = express.Router();

// middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());

// routes
router.use('/movies', moviesRouter);

export default router;
