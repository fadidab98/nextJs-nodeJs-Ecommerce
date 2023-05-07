import express from 'express';
import { destroy ,show,create,productDetails, index, filter} from '../controllers/productController.js';
import auth from '../middleware/auth-middleware.js';
const router = express.Router();
/* FrontEnd for products routes */
router.post('/destroy',auth,destroy);
router.get('/:id',show);
router.get('/details/:id',productDetails);
router.get('/all/products',index);
router.post('/filter',filter);
router.post('/create',auth,create);

export default router;
