import express from 'express';
import cookieParser from 'cookie-parser';

import petRouter from './petRouter';

const router = express.Router();

// middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());

// routes
router.use('/pets', petRouter);

export default router;
