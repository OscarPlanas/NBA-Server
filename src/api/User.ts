import userController from '../controller/userController';
import { Router } from 'express';
import { body } from 'express-validator';

const router = Router();

router.get('/getIdentity', userController.getAllAnonymousIdentity);
router.get('/', userController.getall);
router.get('/:id', userController.getone);
router.delete('/:id', userController.deleteUser);



router.post('/createAnonymousIdentity/:username', userController.createAnonymousIdentity);

export default router;