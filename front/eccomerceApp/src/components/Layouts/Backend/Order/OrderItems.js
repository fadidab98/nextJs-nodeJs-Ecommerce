import React from 'react'
import Table from '../Table/Table'
import { useGetAllProductsQuery } from '@/store/dataApi/dashboard/orderApi';
import Image from 'next/image';

function OrderItems(props) {
    const data1 =[{title:'ITEMS'},{title:'QTY '},{title:'UNIT PRICE '},{title:'AMOUNT'}];
    const {data} = useGetAllProductsQuery(props.data?.data[0]?.products);
    console.log(data)
  return (
    <Table>
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
            {data?.data?.map(data=>{
               return <tr >

                <td  className=" py-4 font-medium text-gray-900 ">
                    <div className='flex'>
                        <div className='w-20 h-28 relative'><Image src={data.product_image} objectFit='content' fill priority alt='No Image'/></div>
                        <div className='w-96 h-auto pl-2 text-left'> <h5 className='text-lg font-semibold'>{data.product_title}</h5> <p className='break-words'>{data.product_description}</p></div>
                    </div>
                </td>
                
                <td>1</td>
                <td>{data.product_price}</td>
                <td>{data.product_price}</td>
               {/*  <td className="px-6 py-4">
                  <div className="flex justify-center">
                    {permissions.indexOf("view-category") !== -1 ?(<Link className=" p-2 rounded-md bg-sky-800 text-md text-white mx-1" href={`/dashboard/categories/show/${data.id}`} >Show</Link>):('')}
                    {permissions.indexOf("view-category") !== -1 ?(<button onClick={()=>{ destroyCategory({id:data.id}).then(()=>router.replace(router.asPath))}}  className=" p-2 rounded-md bg-red-800 text-md text-white mx-1"  >Delete</button >):('')} </div>
                </td> */}
                
            </tr>
          
            })}
           <tr className='text-gray-900'>
            <td></td>
            <td>Total</td>
            <td colSpan={2} >220</td>
           </tr>
        </tbody>
    </Table>
  )
}

export default OrderItems