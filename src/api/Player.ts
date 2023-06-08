import playerController from '../controller/playerController';
import { Router } from 'express';
import { body } from 'express-validator';

const router = Router();

router.post('/create', playerController.createdPlayer)

export default router;