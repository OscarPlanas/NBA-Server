import { Router } from 'express';
import userController from '../controller/userController';

const router = Router();

router.get('/getIdentity', userController.getAllAnonymousIdentity);
router.get('/', userController.getall);



router.post('/createAnonymousIdentity/:username', userController.createAnonymousIdentity);
router.post('/sendVote/:paillierVote/:encrypted', userController.sendVote);
router.get('/publicKey', userController.getRsaPublicKey);
router.get('/getPailierPublicKey', userController.getPailierPublicKey);
router.get('/getAllPlayers', userController.getAllPlayers);

export default router;