// This is your test secret API key.
import Stripe from 'stripe'
import express  from 'express';
const STRIP_KEY ='sk_test_51N3hZ0JiFVUDx6N0BA1O52UL9WUz6ApxUwpcEIAPDprQQ0cz1IAsIeiKQ6VFpuV1nxUeIcz2bco1tdQnDS341ljj00ko5SXeV7'
 const stripe = Stripe(STRIP_KEY)
const YOUR_DOMAIN = 'http://localhost:3000';
const router = express.Router();
router.post('/create-checkout-session', async (req, res) => {
  console.log(req.body)
  const line_items = req.body.products.map(product=>{
    return{
      price_data:{
        currency:"usd",
        product_data:{
          name:product.product_title,
          images:[product.product_image],
          description:product.product_description,
          metadata:{
            id:product.id
          }
        },
        unit_amount:product.product_price * 100
      },
      quantity: 1,

    }
  })
  const session = await stripe.checkout.sessions.create({
  phone_number_collection:{
    enabled:true
  },
    line_items,
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/checkoutSuccess`,
    cancel_url: `${YOUR_DOMAIN}/cart`,
  });

  res.json({url: session.url});
});
export default router