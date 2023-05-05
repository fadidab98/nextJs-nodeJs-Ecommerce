// This is your test secret API key.
import Stripe from 'stripe'
import express  from 'express';
import { stringify } from 'uuid';
const STRIP_KEY ='sk_test_51N3hZ0JiFVUDx6N0BA1O52UL9WUz6ApxUwpcEIAPDprQQ0cz1IAsIeiKQ6VFpuV1nxUeIcz2bco1tdQnDS341ljj00ko5SXeV7'
 const stripe = Stripe(STRIP_KEY)
const YOUR_DOMAIN = 'http://localhost:3000';
const router = express.Router();
router.post('/create-checkout-session', async (req, res) => {
  console.log(req.body)
  const str = JSON.stringify(req.body.products);
  const customer = await stripe.customers.create({
    metadata:{
      userId:req.body.user,
      cart:str.substring(0,499) 
    },
  })

  const line_items = req.body.products.map(product=>{
    return{
      price_data:{
        currency:"usd",
        product_data:{
          name:product.product_title,
          images:[product.product_image],
          description:product.product_description,
          metadata:{
            userId:product.id
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
  customer:customer.id,
    line_items,
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/checkoutSuccess`,
    cancel_url: `${YOUR_DOMAIN}/cart`,
  });

  res.json({url: session.url});
});
let endpointSecret ;
/* = "whsec_8b90b26699eba15df8a704d8f95654d3b397304ec2a57d8e51181bc5d028a5c9";
 */
router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let data;
  let eventType;
  if(endpointSecret){
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log('webhook verified')
    } catch (err) {
      console.log('webhook Error')
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }   
    data= event.data.object;
    eventType= event.type; 
  }else{
    data = req.body.data.object;
    eventType= req.body.type;
  }

if(eventType == 'checkout.session.completed')
{
  stripe.customers.retrieve(data.customer).then((customer)=>{
    console.log(customer);
    console.log('data:',data)
  }).catch(err=> console.log(err.message))
}
  // Handle the event
  
  // Return a 200 res to acknowledge receipt of the event
  res.send().end();
});

export default router