import express from 'express';
import { destroy, edit, index, routes, show, store } from '../../controllers/dashboard/categoryController/categoryController.js';
import auth from '../../middleware/auth-middleware.js';
import checkAdmin from '../../middleware/checkAdmin.js';
import checkPer from '../../middleware/permission-middleware.js';


const router = express.Router();


router.get('/category',[auth,checkAdmin,checkPer('view-categories')],index);
router.get('/category/routes',routes);
router.get('/category/show/:id',[auth,checkAdmin,checkPer('view-category')],show)
router.post('/category/destroy',[auth,checkAdmin,checkPer('delete-category')],destroy)
router.post('/category/store',[auth,checkAdmin,checkPer('create-category')],store);
router.patch('/category/edit/:id',[auth,checkAdmin,checkPer('edit-category')],edit);

export default router