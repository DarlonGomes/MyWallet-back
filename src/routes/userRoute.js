import { signIn, signUp } from '../controllers/userController.js';
import express from 'express';

const router = express.Router();

router.post("/sign-up", signUp); 
router.post("/sign-in", signIn);

export default router;