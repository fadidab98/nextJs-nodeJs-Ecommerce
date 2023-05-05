import GuestLayout from '@/components/Layouts/FrontEnd/GuestLayout'
import React from 'react'

function checkoutSuccess() {
  return (
    <GuestLayout>
    <div className='w-full h-96 flex justify-center items-center'>
        <div className='text-black text-center text-2x' >Checkout Success</div>
    </div>
    </GuestLayout>
  )
}

export default checkoutSuccess