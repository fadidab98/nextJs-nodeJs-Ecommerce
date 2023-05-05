import express from 'express'
import { checkAuth, login, logout, refresh, register } from '../controllers/auth.js';
import auth from '../middleware/auth-middleware.js';
const router = express.Router();
router.post('/register',register);

router.get('/auth',auth,checkAuth);
router.post('/login',login);
router.post('/refresh',refresh)
router.post('/logout',logout);
export default router;