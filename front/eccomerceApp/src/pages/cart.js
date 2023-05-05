import GuestLayout from '@/components/Layouts/FrontEnd/GuestLayout'
import axios from '@/lib/axios';
import dynamic from 'next/dynamic';
import Head from 'next/head';


import React from 'react'
import { useDispatch } from 'react-redux';
const CartLayout =dynamic(()=>import('@/components/Layouts/FrontEnd/CartLayout/CartLayout'))

const  cart=()=> {

  return (
    <GuestLayout>
           <Head>
            <meta charset="UTF-8"/>
                    <meta name="description" content="shoping Free"/>
                    <meta name="keywords" content="Shoping, Free, Online Shoping"/>
                    <meta name="author" content="Shopify"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                                    <title>Shopify | Eco</title>
            </Head>
      <CartLayout/>
    
    </GuestLayout>
  )
}

export default cart


 export const getServerSideProps =async(context)=>{
    /* we should put user id */
    
     const cook  = context.req.headers.cookie;
    let data= 401; 
          try{
            const response = await axios.get('/api/auth',{
            withCredentials:true,
            
            headers:{
              Cookie: cook
            }
          })
           data = await response.status;
          console.log("data",data)



          if (!cook && data==401)  {
            return {
              redirect: {
                destination: '/login',
                permanent: false,
              },
            }
          }
          return {
            props:{ data  },
          }
        }catch(error){
          if (!cook && data==401)  {
            return {
              redirect: {
                destination: '/login',
                permanent: false,
              },
            }
          }
          return {
            props:{ data } ,
          }
        }
     
 return{
  props:{}
 }
  
   
} 