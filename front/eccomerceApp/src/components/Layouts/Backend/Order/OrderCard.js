import React from 'react'
import OrderPayment from './OrderPayment'
import { useGetOrderByIdQuery } from '@/store/dataApi/dashboard/orderApi'
import { useRouter } from 'next/router'
import OrderSummary from './OrderSummary'
import OrderItems from './OrderItems'

function OrderCard() {
  const router = useRouter()

  const id= router.query.id 
  const {data} = useGetOrderByIdQuery(id)

  return (
      <>    <section className='w-full p-10'>
    <OrderPayment data={data}/>
    </section>
    <section className='w-full p-10 ' >
      <h1 className='text-xl font-semibold border-b-2 border-gray-200 py-1'> Checkout Summary</h1>
      <OrderSummary data={data}/>
      <OrderItems data={data}/>
    </section>
    </>

  )
}

export default OrderCard