import React from 'react'
import { Nunito } from '@next/font/google';
import Link from 'next/link';
import {GoThreeBars} from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { changeFrontToggle } from '@/store/settingSlice';

const nunito = Nunito({
    subsets: ['latin'],
    display: 'swap',
  })
function UnAuthUser() {
  const dispatch = useDispatch();
  const toggle = useSelector(state=>state.setting.setting.frontToggle);
  return (
    <ul className={nunito.className +' flex items-center '}>
    <li className='px-2 hover:text-sky-300'><Link href="/login">Login</Link></li>
    <li className='px-2 hover:text-sky-300'><Link href="/register">Register</Link></li>
    <li className='px-2 hover:text-sky-300 xl:hidden lg:hidden'>
    <button onClick={()=>dispatch(changeFrontToggle(toggle))}><GoThreeBars size={34}/></button></li>

    
</ul>
  )
}

export default UnAuthUser