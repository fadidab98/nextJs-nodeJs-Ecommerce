import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from '../../../../../public/uploads/mainImage/Logo.svg'
import { Nunito } from '@next/font/google';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { getCookie, getCookies, hasCookie } from 'cookies-next';
import SideNav from './SideNav';

const MainLinks = dynamic(()=>import('./MainLinks'),{ssr:false});
const UnAuthUser = dynamic(()=>import('./UnAuthUser'),{ssr:false});
const AuthUser = dynamic(()=>import('./AuthUser'),{ssr:false});



const nunito = Nunito({
    subsets: ['latin'],
    display: 'swap',
  })

const Navbar =()=>{

        const user = useSelector(state=> state.users.user)
       const token= getCookie('user')
            const [auth,setAuth] = useState(<UnAuthUser/>) ;
            const toggle = useSelector(state=>state.setting.setting.frontToggle);
            const [showToggle,setShowToggle] = useState(<div></div>)

     useEffect(()=>{
      if(token)
      {
        setAuth(<AuthUser/>)
      }
      
      else{
        setAuth(<UnAuthUser/>)
      }
     
     },[])
      console.log(token)

     
       
      
      
  console.log(toggle)
    return<>
    <nav className={'bg-sky-800  h-20 w-full  flex items-center justify-between text-white px-4 ' + nunito.className }>
        <div className={'h-full p-0 m-0  flex items-center    '}><Image src={Logo} width={60} priority alt="No Image" /></div>
        <div className='flex justify-center items-center h-full'>
          
           <MainLinks/>
            
            </div>
            <div className='flex justify-center items-center'>
         {/* temp */}    {auth}   
  
            </div>
           
    </nav>
  {toggle?<SideNav/>:''}   
    </>
}
export default Navbar