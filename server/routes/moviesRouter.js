import express from 'express';
import getMovies from '../api/movies/getMovies';
const router = express.Router();

router.get('/:limit', getMovies);

export default router;
