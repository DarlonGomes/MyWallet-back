import { signIn, signUp } from '../controllers/userController.js';
import express from 'express';

const router = express.Router();

router.post("/signup", signUp); 
router.post("/signin", signIn);

export default router;