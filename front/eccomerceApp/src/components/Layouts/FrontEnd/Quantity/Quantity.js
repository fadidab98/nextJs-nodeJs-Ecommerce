import { Decrease, Increase } from '@/store/CounterSlice';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Quantity() {
    const quantity = useSelector(state=>state.counter.counter);
  const dispatch= useDispatch()
  const [disabled ,setDisabled] = useState(false);

 
    return (
            <div className='flex w-1/5 mx-2'>
                <button onClick={()=>dispatch(Increase())} className='w-10 h-10 bg-sky-700 text-white text-lg p-2 rounded-l-md'>+</button>
                <div className='w-full h-10  flex justify-center items-center '>{quantity}</div>
                <button onClick={()=>dispatch(Decrease())} className='w-10 h-10 bg-sky-700 text-white text-lg p-2 rounded-r-md' >-</button>
            </div>
  )
}

export default Quantity