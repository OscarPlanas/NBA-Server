import paillierController from "../controller/paillierController";
import { Router } from "express";

const router = Router();

router.get('/getPailierPublicKey', paillierController.getPailierPublicKey);


export default router;