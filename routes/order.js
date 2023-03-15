import express from "express";
import { OrderItemSave, OrderSave } from "../controllers/OrderController";
import { VerifyToken } from '../middleware/VerifyToken';

var router = express.Router();

router.post('/add', VerifyToken, OrderSave);
router.post('/add-item', VerifyToken, OrderItemSave);

export default router;