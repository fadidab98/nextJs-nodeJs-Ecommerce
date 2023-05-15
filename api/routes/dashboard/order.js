import express from 'express';

import auth from '../../middleware/auth-middleware.js';
import checkAdmin from '../../middleware/checkAdmin.js';
import checkPer from '../../middleware/permission-middleware.js';
import { index, ordersId, show, showArrayProducts } from '../../controllers/dashboard/orderController/OrderController.js';


const router = express.Router();
/* Dashboard:  permission routes */


router.get('/',[auth,checkAdmin],index) //checkPer("show-permissions")
 router.get('/all_id',ordersId);
 router.get('/show/:id',[auth,checkAdmin],show);
 router.get('/show_products/:products',[auth,checkAdmin],showArrayProducts);
/* router.get('/permissions/userPermission/:id',[auth,checkAdmin],showPerById)
 */
export default router