import { signIn, signUp } from '../controllers/userController.js';
import { clearData } from "../middlewares/stripMiddleware.js";
import { userValidationSchemas } from '../middlewares/joiMiddlewares.js';
import express from 'express';

const router = express.Router();

router.post("/signup",clearData,userValidationSchemas, signUp); 
router.post("/signin",clearData,userValidationSchemas, signIn);

export default router;

