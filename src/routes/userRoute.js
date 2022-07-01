import { signIn, signUp } from '../controllers/userController.js';
import { clearData } from "../middlewares/stripMiddleware.js";
import express from 'express';

const router = express.Router();

router.post("/signup",clearData, signUp); 
router.post("/signin",clearData, signIn);

export default router;

