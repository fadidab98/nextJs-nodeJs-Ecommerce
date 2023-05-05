import express from 'express';
import { index, show, showPerById } from '../../controllers/dashboard/permissionController/permissionController.js';

import auth from '../../middleware/auth-middleware.js';
import checkAdmin from '../../middleware/checkAdmin.js';
import checkPer from '../../middleware/permission-middleware.js';


const router = express.Router();


router.get('/permissions',[auth,checkAdmin],index) //checkPer("show-permissions")
 
router.get('/permissions/userPermission/:id',[auth,checkAdmin],showPerById)

export default router