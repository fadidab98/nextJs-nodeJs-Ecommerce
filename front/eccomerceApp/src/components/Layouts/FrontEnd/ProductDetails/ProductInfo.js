import React from 'react'
import Quantity from '../Quantity/Quantity'

function ProductInfo(props) {
  return (
    <div className='flex flex-col w-100 pt-5'>
        <h1 className='text-sky-900 text-2xl'>{props.data.product_title}</h1>
        <div><h2>Brand : </h2></div>
        <div><h5>Color : </h5></div>
        <div className='flex items-center'><p>Quantity : </p> <Quantity/> </div>
        
        <div><p>{props.data.product_description}</p></div>

    </div>
  )
}

export default ProductInfo