import express from 'express';
import { currencyHandler, deleteHandler, editHandler } from '../controllers/currencyController.js';
import { userReceipt } from '../controllers/receiptController.js';

const router = express.Router();

router.get("/receipt", userReceipt);  

router.post("/currency",currencyHandler); 
router.delete("/currency/:itemID", deleteHandler); 
router.put("/currency",  editHandler); 

export default router;