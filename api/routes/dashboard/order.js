import express from 'express';

import auth from '../../middleware/auth-middleware.js';
import checkAdmin from '../../middleware/checkAdmin.js';
import checkPer from '../../middleware/permission-middleware.js';
import { index } from '../../controllers/dashboard/orderController/OrderController.js';


const router = express.Router();
/* Dashboard:  permission routes */


router.get('/orders',[auth,checkAdmin],index) //checkPer("show-permissions")
 
/* router.get('/permissions/userPermission/:id',[auth,checkAdmin],showPerById)
 */
export default router