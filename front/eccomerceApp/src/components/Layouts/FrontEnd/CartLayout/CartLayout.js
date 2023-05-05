import { useGetCartQuery } from '@/store/dataApi/cartApi';
import React from 'react'
import Cart from '../Cart/Cart'
import CheckOut from './CheckOut/CheckOut';

function CartLayout() {
    const {data,isLoading,isError} = useGetCartQuery();

     let price = 0;
  if(isLoading){
    return <div>Loading ...</div>
  }
  if(isError)
  {
  return <div>{data?.message}</div>
  }
  {/* */}
  return (
    <div className='flex flex-wrap m-4 '>
    <div className='xl:w-3/5 lg:w-3/5 md:w-screen sm:w-screen flex flex-col  mt-10   '>


      {isLoading?(<div>Loading ...</div>):(isError?(<div>{data?.message}</div>):(data?.data?.length ?(data.data?.map(product=>{
            price += product.product_price
       return <Cart key={product.id +Math.random()} data={product}/>
      })):(
        <div className='mx-2 flex items-center justify-center w-full h-32 shadow-md rounded-md  '>
          <h2 className='text-red-700'>No products</h2>
           
        </div>
      )))}




        
        
    </div>
    <div className=' xl:w-2/5 lg:w-2/5 md:w-screen sm:w-screen p-10 bg-gray-100  rounded-md text-center'>
        <CheckOut total={data?.data?.length ?data.data?.length:0   } products={data?.data} price={price}/>
    </div>
    </div>
  )
}

export default CartLayout