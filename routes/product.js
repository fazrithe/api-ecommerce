import express from 'express';
import { ProductGetAll, ProductSave, ProductUpdate, ProductDelete } from '../controllers/ProductController';
import { VerifyToken } from '../middleware/VerifyToken';

var router = express.Router();

router.post('/add', VerifyToken, ProductSave);
router.get('/', VerifyToken, ProductGetAll);
router.put('/update/:id', VerifyToken, ProductUpdate);
router.delete('/delete/:id', VerifyToken, ProductDelete);


export default router;
