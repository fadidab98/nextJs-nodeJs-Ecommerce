import { useRouter } from 'next/router'
import React from 'react'
import { MdPayment } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { BsCheck2 } from 'react-icons/bs'


function OrderPayment(props) {
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric"}
        return new Date(dateString).toLocaleDateString(undefined, options)
      }
 console.log(typeof props.data?.data[0]?.total)
  return (<>
    <div className='head flex items-center text-gray-600'>
        <MdPayment size='17px'/> <h5 className=' text-sm'>PAYMENT</h5>
    </div>
    <div className='flex items-center py-3 border-b-2 border-gray-200'>
       <span className='text-2xl'>${( props.data?.data[0]?.total / 100).toFixed(2)} <span className='text-gray-600 ml-0 pl-0'>{props.data?.data[0]?.currency.toUpperCase()}</span></span>  <span className='rounded-md bg-green-400 text-green-900 ml-14 px-5 py-1 text-sm'> {props.data?.data[0]?.status ==  'complete'? <span className='flex items-center '>Succeeded  <BsCheck2  size={'20px'}/></span>:'Error'} </span>
    </div>
    <div className='w-full flex'>
        <div className='flex flex-col border-2 border-gray-200 rounded-md px-2 m-2 py-2 shadow-md'>
            <h2 className='text-gray-500'>Last update</h2>
            <h3 className=''>{formatDate(props.data?.data[0]?.date)}</h3>
        </div>
        <div className='flex flex-col border-2 border-gray-200 rounded-md px-2 m-2 py-2 shadow-md'>
            <h2 className='text-gray-500'>Customer</h2>
            <h3 className=''>{props.data?.data[0]?.email}</h3>
        </div>
        <div className='flex flex-col border-2 border-gray-200 rounded-md px-2 m-2 py-2 shadow-md'>
            <h2 className='text-gray-500'>Payment method</h2>
            <h3 className=''>{props.data?.data[0]?.payment_method?JSON.parse(props.data?.data[0]?.payment_method)[0]:''}</h3>
        </div>
        <div className='flex flex-col border-2 border-gray-200 rounded-md px-2 m-2 py-2 shadow-md'>
            <h2 className='text-gray-500'>Delivery Status</h2>
            <h3 className=''>{props.data?.data[0]?.delivery_status}</h3>
        </div>
    </div>
    </>
  )
}

export default OrderPayment