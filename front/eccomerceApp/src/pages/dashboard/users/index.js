import AppLayout from "@/components/Layouts/Backend/AppLayout"
import Pagination from "@/components/Layouts/FrontEnd/Pagination/Pagination"
import { getAllUsers, getRunningQueriesThunk, useDeleteUserMutation, useGetAllUsersQuery } from "@/store/dataApi/dashboard/usersApi"
import { initializeStore } from "@/store/store"
import axios from "axios"
import { getCookies, setCookie } from "cookies-next"
import dynamic from "next/dynamic"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"


const Header =dynamic(()=>import('@/components/Layouts/Backend/Header/Header',{ssr:false}))
const Table = dynamic(()=>import('@/components/Layouts/Backend/Table/Table',{ssr:false}))
const index = (props)=>{
    const router = useRouter();
    setCookie('refreshToken', props?.refresh,{maxAge:24* 60 *60 *1000})
    setCookie('access_token', props?.tokens,{maxAge: 60 *60 *1000})
    setCookie('permission', props?.permission,{maxAge:60 *60* 24})
    const [deleteUser,result] = useDeleteUserMutation()

    const [permissions,setPermissions] = useState([])

    useEffect(()=>{
        localStorage.setItem('per',props?.permission)
            setPermissions( JSON.parse(localStorage.getItem('per')))
    },[]) // 0_0
    console.log(permissions)
    const data1 =[{title:'Name'},{title:'Email'},{title:'Role'},{title:'Control'}]
    return <AppLayout>
        <Head>
            <meta charset="UTF-8"/>
                    <meta name="description" content="shoping Free"/>
                    <meta name="keywords" content="Shoping, Free, Online Shoping"/>
                    <meta name="author" content="Shopify"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                                    <title>Shopify | Eco</title>
        </Head>
           
     {/* header */}
        <Header father="Users" child="Home"/>
     {/* Ende header */}
     {/* Table */}
     <section className="w-full h-auto"> 
     <div>

    <Table head={data1} data={props.data}>
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
            {props.data?.data?.map(data=>{
               return <tr key={data.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {data.name}
                </th>
                <td className="px-6 py-4">
                    {data.email}
                </td>
                <td className="px-6 py-4">
                    {data.role}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center"> 
                  {permissions.indexOf('view-user') !== -1?(<Link className=" p-2 rounded-md bg-sky-800 text-md text-white mx-1" href={`/dashboard/users/show/${data.id}`} >Show</Link>):('')}
                  {permissions.indexOf('delete-user') !== -1?(<button onClick={()=>{deleteUser({id:data.id}).then(()=>router.replace(router.asPath))}} className=" p-2 rounded-md bg-red-800 text-md text-white mx-1" >Delete</button>):('')}
                  
                   
                   </div>
                </td>
            </tr>
            })}
         
        </tbody>

   </Table>
   <div><Pagination data={props.data?.pagination}/></div>

   </div>
    </section>
     {/* End Table */}
    </AppLayout>
}
export default index
export const getServerSideProps=async(ctx)=>{
    let refresh = null;
    let tokens = null;
    let permi = null;


const ref =  getCookies(ctx)
const refreshToken =ref.refreshToken
console.log('ref',JSON.stringify(ref.refreshToken))
  await axios.post('http://localhost:8800/api/refresh',{refreshToken}).then(res=>{
    console.log('refreshToken',res.data.refreshToken)
      setCookie('refreshToken',res.data.refreshToken,{ctx,maxAge:24* 60 *60 *1000})
      refresh = res.data.refreshToken;
      setCookie('access_token',res.data.access_token,{ctx,maxAge:  60 *60 *1000})
        permi = JSON.stringify(res.data.permission)
        setCookie('permission', JSON.stringify(res.data.permission) ,{ maxAge: 60* 60 * 24})
      tokens =res.data.access_token;
      console.log('access_token',res.data.access_token)
    })

    const store = initializeStore();
    const {page} = ctx.query;
    const token =  ctx.req.headers.cookie;

 

    console.log('page',page)
    await store.dispatch(getAllUsers.initiate({page:page,cookie:token}));
    await Promise.all(store.dispatch(getRunningQueriesThunk()))


    const {data:users , status} = getAllUsers.select({page:page,cookie:token})(store.getState());
    console.log('users',status.status)
    if(status !== 'fulfilled' && !tokens && !refresh)
    {
        return {
            redirect: {
              destination: '/dashboard/',
              permanent: false,
            },
          }
    }else{
    return {
        props:{data:users?users:null,tokens:tokens,refresh:refresh,permission:permi}
    }
    }


}