import Link from 'next/link'
import React from 'react'

function AddToCartButton() {
  return (
    <Link href={'/cart'} className='bg-sky-700 rounded-md w-1/2 px-4 py-2 text-white text-center hover:bg-sky-900 m-3'>Add To Cart</Link>
  )
}

export default AddToCartButton