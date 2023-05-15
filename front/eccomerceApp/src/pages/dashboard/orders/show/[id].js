import AppLayout from '@/components/Layouts/Backend/AppLayout'
import OrderCard from '@/components/Layouts/Backend/Order/OrderCard';
import { getAllOrderId, getRunningQueriesThunk, useGetOrderByIdQuery } from '@/store/dataApi/dashboard/orderApi';
import { initializeStore } from '@/store/store';
import React from 'react'
export const getStaticPaths =async()=>{
  const store = initializeStore();

  await store.dispatch(getAllOrderId.initiate())
  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  const {data:orderId} = getAllOrderId.select()(store.getState())

  const paths = orderId?.data?.map(id=>{
      return{ params : { id : id.id?.toString()}}
  });
  return{
      paths:paths,
      fallback:'blocking'
    }
}
export const getStaticProps=async(context)=>{
  const {id} = context.params;

  
  return{ 
       props:{id},
       revalidate:10
      }
}
function index(props) {
    const {data} = useGetOrderByIdQuery(props.id)
    console.log(data)
  return (
   <AppLayout>
    <OrderCard/>
   </AppLayout>
  )
}

export default index