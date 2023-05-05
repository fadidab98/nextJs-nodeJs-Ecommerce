import { useCountCartQuery, useDeleteCartMutation, useGetCartQuery } from '@/store/dataApi/cartApi';
import Image from 'next/image'
import React from 'react'
import Mobile from '../../../../../public/uploads/products/Mobile/mobile.jpg';

function Cart(props) {
    const [deleteCart] = useDeleteCartMutation();
   const result = useGetCartQuery()

   const data = useCountCartQuery();

  return (

   <div className='flex justify-center w-full h-32 p-2 shadow-md'>
    {/* Image */}
    <div className='relative w-1/5 h-full'>
        <Image src={Mobile} layout="fill" objectFit="cover"  priority alt="Image Error" />
    </div>
    <div className='flex flex-col w-full h-full px-8 pt-2'>
        <h2 className='text-xl text-sky-900'>{props.data.product_title}</h2>
        <h3 className='text-sm'>Rates : </h3>
        <h4 className='text-sm' >Quantity : {props.data.quantity}</h4>
        <div className='flex flex-row-reverse '>
            <button onClick={()=> { deleteCart({product:props.data.id,cart:props.data.categoryId}).then(()=>{
                result.refetch()
                data.refetch()
                })}} className='text-red-800 px-2 border-b-2 border-red-800 mx-1'>Delete</button>
            <button className='text-sky-800 px-2 border-b-2 border-sky-800 mx-1'>Edite</button>

        </div>
    </div>
   </div>
  )
}

export default Cart