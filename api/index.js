import express from 'express';
import authApi from './routes/auth.js'
import productApi from './routes/product.js'
import categoryApi from './routes/category.js'
import dashboardApi from './routes/dashboard/dashboard.js'
import categoryDashApi from './routes/dashboard/category.js'
import usersDashApi from './routes/dashboard/users.js'
import productDashApi from './routes/dashboard/products.js'
import stripe from './routes/checkOut.js'
import permissionDashApi from './routes/dashboard/permission.js'

import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cartApi from './routes/cart.js';
import bodyParser from 'body-parser';


const corsOptions ={
    origin:'*',
     
    credentials:true,            //access-control-allow-credentials:true
}
const app = express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(compression());
app.use(cookieParser());

app.use(cors({
                origin:'http://localhost:3000',
                credentials:true,}));
app.use(express.json());

app.use('/api',authApi);
/* Front_End start */
app.use('/api/product',productApi);
app.use('/api/stripe',stripe);
app.use('/api/category',categoryApi);
app.use('/api/cart',cartApi);

/* Front_End End */

/* Dashboard Start */
app.use('/api',dashboardApi);
app.use('/api/dashboard',categoryDashApi);
/* users Routes */
app.use('/api/dashboard',usersDashApi);
/* users Routes  End*/
/* permissions route */
app.use('/api/dashboard',permissionDashApi);

/* permissions route End */


app.use('/api/dashboard',productDashApi);



/* Dashboard End */

app.listen(8800,()=>{
    console.log('connected');
});
