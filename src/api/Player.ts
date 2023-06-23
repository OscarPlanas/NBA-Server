import { Router } from 'express';
import playerController from '../controller/playerController';

const router = Router();

router.post('/create', playerController.createdPlayer)
router.get('/', playerController.getPlayers);

export default router;