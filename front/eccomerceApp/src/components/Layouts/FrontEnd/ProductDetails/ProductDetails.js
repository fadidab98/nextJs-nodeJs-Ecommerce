import dynamic from 'next/dynamic'

import React from 'react'
import BuyButton from '../Buttons/BuyButton'

import ProductImg from './ProductImg'
import ProductInfo from './ProductInfo'
import RelativeProducts from './RelativeProducts';

const AddToCartButton = dynamic(()=>import('../Buttons/AddToCartButton'),{
  ssr:false
});
function ProductDetails(props) {
 return ( <>
    <div className='flex flex-wrap justify-center  w-full min-h-96	p-3 '>
        {/* Image */}
        <div className='xl:w-2/5 lg:w-2/5 md:w-full sm:w-full '>
       <ProductImg img={props.data.product_image} subImage={props.data?.product_sub_image}/>
       </div>
        {/* details */}
        <div className='xl:w-3/5 lg:w-3/5 md:w-full sm:w-full md:pl-4 sm:pl-4'>
            {/* title */}
            <ProductInfo data={props.data}/>
            <div className='flex justify-center'>
              <AddToCartButton/>
              <BuyButton/>
              </div>
        </div>
        
    </div>
    <div className=''>
      <h2 className='text-xl text-sky-900 border-l-4 border-gray-300 ml-6 pl-2 my-3'>Relative Products</h2>
      <RelativeProducts/>
    </div>
    </>
  )
}

export default ProductDetails