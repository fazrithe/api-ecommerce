import express from "express";
import { TransactionDelete, TransactionGetAll, TransactionGetId } from "../controllers/TransactionController";
import { VerifyToken } from '../middleware/VerifyToken';

var router = express.Router();

router.get('/', VerifyToken, TransactionGetAll);
router.get('/:id', VerifyToken, TransactionGetId);
router.delete('/delete/:id', VerifyToken, TransactionDelete);

export default router;