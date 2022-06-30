import express from 'express';
import { currencyHandler, deleteHandler, editHandler, userBalance } from '../controllers/currencyController.js';
import { userReceipt } from '../controllers/receiptController.js';

const router = express.Router();

router.get("/balance", userBalance); 
router.get("/receipt", userReceipt); 

router.post("/currency",currencyHandler); 
router.delete("/currency", deleteHandler); 
router.put("/currency",  editHandler); 

export default router;