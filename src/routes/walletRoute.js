import express from 'express';
import { currencyHandler, deleteHandler, editHandler } from '../controllers/currencyController.js';
import { userReceipt } from '../controllers/receiptController.js';
import { clearData } from "../middlewares/stripMiddleware.js";
import { currencyValidationSchemas } from '../middlewares/joiMiddlewares.js';
import { sessionHandler } from '../middlewares/sessionMiddleware.js';
const router = express.Router();

router.get("/receipt",sessionHandler, userReceipt);  

router.post("/currency", clearData,currencyValidationSchemas,sessionHandler, currencyHandler); 
router.delete("/currency/:itemID",sessionHandler, deleteHandler); 
router.put("/currency", clearData,currencyValidationSchemas,sessionHandler, editHandler); 

export default router;