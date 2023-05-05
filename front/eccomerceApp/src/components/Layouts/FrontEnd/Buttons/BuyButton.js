import Link from 'next/link'
import React from 'react'

function BuyButton() {
  return (
    <Link href={'/buy'} className='bg-green-500 rounded-md w-1/2 px-4 py-2 text-white text-center hover:bg-green-900 m-3'>Buy</Link>

  )
}

export default BuyButton