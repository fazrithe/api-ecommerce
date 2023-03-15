import express from 'express';
import { CustomerLogin, CustomerRegister } from '../controllers/CustomerauthController';
import { CustomerGetAll, CustomerProfile } from '../controllers/CustomerController';
import { VerifyToken } from '../middleware/VerifyToken';

var router = express.Router();

router.post('/register', CustomerRegister);
router.post('/login', CustomerLogin);
router.get('/', VerifyToken, CustomerGetAll);
router.get('/me/:id', VerifyToken, CustomerProfile);

export default router;
