import React from 'react'

function OrderSummary(props) {
  return (
    <>
    <div className='flex shadow-md'>
        <div className='w-36 '>
            <h2 className='text-gray-700'>Customer</h2>
          
        </div>
        <div className=' flex flex-col text-gray-800'>
                <span>{ props.data?.data[0]?.email}</span>
                <span>{ props.data?.data[0]?.phone}</span>
                <span>{ props.data?.data[0]?.country}</span>
        </div>
    </div>
    
    </>
    
  )
}

export default OrderSummary