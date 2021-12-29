import express from 'express';
import { findAll, save } from '../../services/pets';
const router = express.Router();

router.get('/', findAll);
router.post('/', save);

export default router;
