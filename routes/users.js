import express from 'express';
import { Register, Login } from '../controllers/UserauthController';
import { UserDelete, UserGetAll, UserSave, UserUpdate } from '../controllers/UserController';
import { VerifyToken } from '../middleware/VerifyToken';
import { RefreshToken } from '../controllers/RefreshToken';

var router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/token', RefreshToken)
router.post('/add', VerifyToken, UserSave);
router.get('/', VerifyToken, UserGetAll);
router.put('/update/:id', VerifyToken, UserUpdate);
router.delete('/delete/:id', VerifyToken, UserDelete);

export default router;
