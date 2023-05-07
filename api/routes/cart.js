import express from 'express';
import { add, index,destroy, count } from '../controllers/cartController.js';
import auth from '../middleware/auth-middleware.js';
const router = express.Router();
/* cart routes */
router.get('/show',auth,index);
router.post('/add',auth,add);
router.get('/count',auth,count);

router.post('/delete',auth,destroy);

export  default router