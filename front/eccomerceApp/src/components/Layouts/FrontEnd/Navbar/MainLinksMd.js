import Link from 'next/link'
import React from 'react'
import styles from '../../../../../styles/Front/Navbar.module.css'
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { changeCategorySlide } from '@/store/settingSlice';
function MainLinksMd() {
  const dispatch = useDispatch();
  const toggle = useSelector(state=>state.setting.setting.categorySlide)

  return (
    <ul className={'flex text-white px-2 flex-col items-center w-full '+styles.fatherMdLinks}>
    <li className=' w-full  my-2   bg-sky-800 rounded-lg '><Link className='block h-full flex items-center  p-2 pl-5' href='/'>Home</Link></li>
    <li className={' w-full  my-2   bg-sky-800 rounded-lg '}><a className=' h-full flex items-center justify-between  p-2  pl-5' ><p>Category</p>  {toggle?<span onClick={()=>dispatch(changeCategorySlide(toggle))} className='float-right pl-10 cursor-pointer'><IoIosArrowUp/></span>:<span onClick={()=>dispatch(changeCategorySlide(toggle))} className='float-right pl-10 cursor-pointer'><IoIosArrowDown/></span>}   </a></li>
   {toggle?(<div className={'  w-full  my-2   rounded-lg z-10   bg-sky-700 rounded-lg  duration-100'}>
   <ul className=' flex flex-col text-center rounded-lg mx-1 w-full '>
    
        <li className='w-full  my-2   bg-sky-800 rounded-lg'><Link className='block h-full flex items-center justify-center  p-2' href="/category/1">Mobile</Link></li>
        <li className='w-full  my-2   bg-sky-800 rounded-lg'><Link className='block h-full flex items-center justify-center  p-2' href="/category/2">Computer</Link></li>

        <li className='w-full  my-2   bg-sky-800 rounded-lg'><Link className='block h-full flex items-center justify-center  p-2' href="/category/3">hardware</Link></li>

    
   


    </ul> 
    </div>):('')} 
    
    
    <li className='w-full  my-2   bg-sky-800 rounded-lg '><Link className='block h-full flex items-center  p-2 pl-5' href="/about">About</Link></li>
    
    </ul>
  )
}

export default MainLinksMd