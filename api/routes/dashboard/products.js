import express from 'express';
import { allRoutes, destroy, edit, index, show, store } from '../../controllers/dashboard/productController/productController.js';
import multer from 'multer';
import auth from '../../middleware/auth-middleware.js';
import checkAdmin from '../../middleware/checkAdmin.js';
import checkPer from '../../middleware/permission-middleware.js';
const ALLOED_FORMATS = ['image/jpeg','image/png','image/jpg'];

const router = express.Router();

console.log('route')
router.get('/products',[auth,checkAdmin,checkPer("view-products")],index);
// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
 router.post('/products/store',[auth,checkAdmin,checkPer("create-product")] ,upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images' }]),store);
router.post('/products/destroy',[auth,checkAdmin,checkPer("delete-product")],destroy);
router.get('/products/show/:id',[auth,checkAdmin,checkPer("show-product")],show)
router.patch('/products/edit/:id',[auth,checkAdmin,checkPer("edit-product")],edit)
 
router.get('/products/allRoutes',allRoutes)

export default router