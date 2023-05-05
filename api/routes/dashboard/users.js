import express from 'express';
import { destroy, edit, index, routes, show, store } from '../../controllers/dashboard/usersController/usersController.js';
import auth from '../../middleware/auth-middleware.js';
import checkAdmin from '../../middleware/checkAdmin.js';
import checkPer from '../../middleware/permission-middleware.js';


const router = express.Router();


router.get('/users',[auth,checkAdmin],index); //checkPer('show-users')
router.get('/users/routes',routes);
router.get('/users/show/:id',[auth,checkAdmin],show); //checkPer('show-user')
router.post('/users/store',[auth,checkAdmin],store);
router.patch('/users/destroy',[auth,checkAdmin],destroy);
router.post('/users/edit/:id',[auth,checkAdmin],edit);

export default router