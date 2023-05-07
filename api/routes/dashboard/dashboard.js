import express from 'express';
import { check } from '../../controllers/dashboard/dashboardController.js';
import auth from '../../middleware/auth-middleware.js';
import checkAdmin from '../../middleware/checkAdmin.js';


const router = express.Router();

/* Dashboard: home page routes    i'll do it latter */

router.get('/checkAdmin',[auth,checkAdmin],check);

export default router