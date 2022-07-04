import express from 'express';
import { currencyHandler, deleteHandler, editHandler } from '../controllers/currencyController.js';
import { userReceipt } from '../controllers/receiptController.js';
import { clearData } from "../middlewares/stripMiddleware.js";
import { currencyValidationSchemas } from '../middlewares/joiMiddlewares.js';
import { tokenHandler } from '../middlewares/tokenMiddleware.js';

const router = express.Router();

router.get("/receipt",tokenHandler, userReceipt);  

router.post("/currency", clearData,currencyValidationSchemas, currencyHandler); 
router.delete("/currency/:itemID", deleteHandler); 
router.put("/currency", clearData,currencyValidationSchemas, editHandler); 

export default router;