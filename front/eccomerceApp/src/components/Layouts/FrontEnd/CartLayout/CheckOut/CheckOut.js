import { usePostCheckOutMutation } from '@/store/dataApi/cartApi'
import React from 'react'
import { useSelector } from 'react-redux';

function CheckOut(props) {
  console.log(props.products)
  const [postCheckOut,result] = usePostCheckOutMutation();
  const user = useSelector(state=> state.users.user);
  console.log(user)

  const submitCheckOut=()=>{
    postCheckOut({
     'products': props.products,
     'user':user.id
    }).then((res)=> window.location.href = res.data?.url)
  }
  return (
    <div>
        {/* head */}

        <div className='bg-orange-300 p-2 rounded-md w-full'>
         {  ` SubTotal (${props.total} item): $ ${props.price}`}
        </div>
        <button onClick={()=>submitCheckOut()}  className='bg-sky-700 text-white m-auto my-4 p-2 rounded-md hover:bg-sky-900'>Procced To Checkout</button>
    </div>
  )
}

export default CheckOut