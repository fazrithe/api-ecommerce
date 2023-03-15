import express from 'express';
import { MerchantDelete, MerchantGetAll, MerchantSave, MerchantUpdate } from '../controllers/MerchantController';
import { VerifyToken } from '../middleware/VerifyToken';

var router = express.Router();

router.post('/add', VerifyToken, MerchantSave);
router.get('/', VerifyToken, MerchantGetAll);
router.put('/update/:id', VerifyToken, MerchantUpdate);
router.delete('/delete/:id', VerifyToken, MerchantDelete);

export default router;
