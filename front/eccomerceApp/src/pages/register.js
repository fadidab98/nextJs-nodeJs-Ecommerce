import React, { useState } from 'react'
import { Nunito } from '@next/font/google';
import GuestLayout from '@/components/Layouts/FrontEnd/GuestLayout';
import Head from 'next/head';
import axios from '@/lib/axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '@/store/userSlice';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { changeLoadingButton } from '@/store/settingSlice';
import { ClipLoader } from 'react-spinners';

/* font */
const nunito = Nunito({
    subsets: ['latin'],
    display: 'swap',
  });





 function register() {
    /* router */
    const router = useRouter()

   /* dispatch */
   const dispatch = useDispatch();
   const  user = useSelector((state)=>state.users.user)
 
   const loading = useSelector(state=>state.setting.setting.loadingButton)
  /* variables */

  const [inputs,setInputs] = useState({
    name:'',
    email:'',
    password:''
  });
  const [validation,setValidation]=useState(null);

  const [error,setError]=useState(null);

  /* functions */
   const inputHnadler = (e)=>{
      setInputs({...inputs,[e.target.name]:e.target.value})
   }

   const submitHandler= (e)=>{
    e.preventDefault();
    dispatch(changeLoadingButton(loading))
    
  
 
     axios.post('/api/register',inputs).then(res=>{
      if(res.data.status==200){
        dispatch(addUser(res.data.data))
        setCookie('user',res.data.data ,{
          maxAge:  60* 60 * 24 
    
        });
         setCookie('refreshToken', res.data.refreshToken,{maxAge:60* 60 * 24})
        setCookie('access_token',res.data.access_token,{maxAge: 60 *15})     
      router.push('/');
      dispatch(changeLoadingButton(!loading));
      console.log('fetch data done');
    }
    else{
      console.log('vaildation Error Register',res.data.error?.details)
      console.log('fetch data Error');
      console.log(res)
      console.log(res.data.msg)
      dispatch(changeLoadingButton(!loading))
      if(res.data.error?.details){
      setValidation(res.data.error?.details.map(er=><li key={Math.random()} className='text-danger text-sm'>{er.message}</li>))
      setError(null)
    }
      if(res.data?.msg){
      setError(res.data.msg)
      setValidation(null)
    }
    

    }
    }).catch(error=>{
      return null
    })
    console.log(error)
    console.log(validation)
  }
  return (
    <GuestLayout>
      <Head>
            <meta charset="UTF-8"/>
                    <meta name="description" content="shoping Free"/>
                    <meta name="keywords" content="Shoping, Free, Online Shoping"/>
                    <meta name="author" content="Shopify"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                                    <title>Shopify | Eco</title>
                                </Head>
              <div className='w-full h-96 flex items-center justify-center   '>
              
            <div className='flex flex-col w-1/2 bg-sky-200 rounded-md shadow-xl'>
                <div className='header bg-sky-900 text-white p-3 border-b-2 border-sky-500 rounded-t-md'><h2 className={'text-2xl '+nunito.className}>Login</h2></div>
              
               <form >
               {validation&&<ul className='text-sm text-danger  py-1 pl-5' style={{listStyleType:'circle'}}>{validation}</ul>}
               {error&&<ul className='text-sm text-danger  py-1 pl-5' style={{listStyleType:'circle'}}><li className='text-danger text-smile'>{error}</li></ul>}
                <div className='flex items-center  p-2'>

                    <label htmlFor="userName" className="px-3 text-sm w-52"> Name :</label>
                    <input type="text" name="name" onChange={inputHnadler} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-4/5 p-2.5  " placeholder="User Name" required />
                 </div>
                 <div className='flex items-center p-2'>
                    <label htmlFor="email" className="px-3 text-sm w-52"> Email :</label>
                    <input type="email" name="email" id="email"  onChange={inputHnadler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-4/5 p-2.5  " placeholder="Email" required />
                 </div>
                 <div className='flex items-center p-2'>
                    <label htmlFor="password" className="px-3 text-sm w-52">  Password :</label>
                    <input type="text" name="password" id="password"  onChange={inputHnadler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-4/5 p-2.5  " placeholder="Conferm Password" required />
                 </div>
                 <div className="w-full text-center m-2">{!loading?(<button  onClick={submitHandler} className='bg-sky-900 text-white p-2 rounded-md'>Register</button>):(<button  className="p-2 bg-sky-800 rounded-md m-auto text-white flex items-center" disabled>Loading <ClipLoader className='mx-1' size={'20'}  color="	#FFFFFF" /></button>)}</div>
                </form>
            </div>
        </div>
        </GuestLayout>
  )
}

export default register