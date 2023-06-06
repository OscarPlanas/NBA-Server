import userController from '../controller/userController';
import { Router } from 'express';
import { body } from 'express-validator';

const router = Router();

//router.post('/register', userController.register);
router.get('/profile/:id', userController.profile);
router.get('/getIdentity', userController.getAllAnonymousIdentity);
router.get('/', userController.getall);
router.get('/:id', userController.getone);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.update);
router.get('/email/:email', userController.getbyemail);


router.post('/createAnonymousIdentity/:username', userController.createAnonymousIdentity);

export default router;