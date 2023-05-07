import express from 'express';
import { destroy ,show,edite,create} from '../controllers/categoryController.js';
import auth from '../middleware/auth-middleware.js';
/* FrontEnd for categories routes */
const router = express.Router();
router.post('/edite',auth,edite);
router.post('/destroy',auth,destroy);
router.get('/show',show);
router.post('/create',auth,create);
export default router;
