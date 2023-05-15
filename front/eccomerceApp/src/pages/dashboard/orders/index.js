import AppLayout from '@/components/Layouts/Backend/AppLayout'
import Table from '@/components/Layouts/Backend/Table/Table'
import axios from 'axios'
import { getAllOrder, getRunningQueriesThunk } from '@/store/dataApi/dashboard/orderApi'
import { initializeStore } from '@/store/store'
import { getCookies, setCookie } from 'cookies-next'
import React from 'react'
import Pagination from '@/components/Layouts/FrontEnd/Pagination/Pagination'
import Link from 'next/link'
import { useRouter } from 'next/router'

function index(props) {
  const router = useRouter();
  const data1 =[{title:'Amount'},{title:'Status'},{title:'Order '},{title:'Customer'},{title:'Date'}]
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric"}
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  console.log(props)
  return (
    <AppLayout>
        <section className="w-full h-auto"> 
  <Table head={data1} >
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {data1.map(head=>{
                    return <th key={Math.random()} scope="col" className="px-6 py-3">
                            {head.title}
                       </th>
                })}
            </tr>
        </thead>
        <tbody>
            {props.data.data?.map(data=>{
               return <tr onClick={()=>router.push(`/dashboard/orders/show/${data.id}`)} key={data.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 hover:cursor-pointer">

                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {data.total}
                </th>
                <td className="px-6 py-4">
                    {data.payment_status}
                </td>
                <td className="px-6 py-4">
                    {data.order_id.substr(1,20)+'...'}
                </td>
                <td className="px-6 py-4">
                    {data.email}
                </td>
                <td>{
                  formatDate(data.date)}</td>
               {/*  <td className="px-6 py-4">
                  <div className="flex justify-center">
                    {permissions.indexOf("view-category") !== -1 ?(<Link className=" p-2 rounded-md bg-sky-800 text-md text-white mx-1" href={`/dashboard/categories/show/${data.id}`} >Show</Link>):('')}
                    {permissions.indexOf("view-category") !== -1 ?(<button onClick={()=>{ destroyCategory({id:data.id}).then(()=>router.replace(router.asPath))}}  className=" p-2 rounded-md bg-red-800 text-md text-white mx-1"  >Delete</button >):('')} </div>
                </td> */}
                
            </tr>
            })}
         
        </tbody>

   </Table>
   <div><Pagination data={props.data?.pagination}/></div>

   </section>
    </AppLayout>
  )
}

export default index
export const getServerSideProps =async(ctx)=>{

  var refresh = null;
  var tokens = null;
  var permi = null;


const ref =  getCookies(ctx)
const refreshToken =ref.refreshToken
console.log('ref',JSON.stringify(ref.refreshToken))
  await axios.post('http://localhost:8800/api/refresh',{refreshToken}).then( res=>{
    console.log('refreshToken',res.data.refreshToken)
      setCookie('refreshToken',res.data.refreshToken,{ctx,maxAge: 60* 60 * 24})
      refresh = res.data.refreshToken;
      setCookie('access_token',res.data.access_token,{ctx,maxAge: 60 *15  } )
      permi = JSON.stringify(res.data.permission);
      setCookie('permission', JSON.stringify(res.data.permission) ,{ maxAge: 60* 60 * 24})
      tokens = res.data.access_token;
      console.log('access_token',res.data.access_token)
      return {tokens,refresh}
    })

    

const store = initializeStore();
const {page} = ctx.query;

const access_token =ref.access_token
const token =  ctx.req.headers.cookie;
console.log('Token',token)
    
console.log('token',tokens)
  await store.dispatch(getAllOrder.initiate({page:page,cookie:token}));
  await Promise.all(store.dispatch(getRunningQueriesThunk()))

    
  const {data:order , status} = getAllOrder.select({page:page,cookie:token})(store.getState());
  console.log('users',order)
  if(status !== 'fulfilled' && !tokens && !refresh)
  {
      return {
          redirect: {
            destination: '/dashboard',
            permanent: false,
          },
        }
  }else{
  return {
      props:{data:order?order:null ,tokens:tokens,refresh:refresh,permission:permi}
  }
}






}