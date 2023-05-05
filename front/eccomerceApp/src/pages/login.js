import GuestLayout from '@/components/Layouts/FrontEnd/GuestLayout'
import React, { useState } from 'react'
import { Nunito } from '@next/font/google';
import Head from 'next/head';
import axios from '@/lib/axios';
import { addUser } from '@/store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';
import { changeLoadingButton } from '@/store/settingSlice';
import { ClipLoader } from 'react-spinners';


const nunito = Nunito({
    subsets: ['latin'],
    display: 'swap',
  });
function login() {
  const dispatch = useDispatch();
  const loading = useSelector(state=>state.setting.setting.loadingButton)
  const router = useRouter();
  const [error,setError]=useState(null);
 const [validation,setValidation]=useState(null)
  const [input,setInput] = useState({
    email:'',
    password:''
    
  })


  const setHandler =(e)=>{
    setInput({...input,[e.target.name]:e.target.value})

  }
  const submitHandler = (e)=>{
    e.preventDefault();
    dispatch(changeLoadingButton(loading))
    console.log('form',input)
  axios.post('/api/login',input).then(response=>{

    if(response.data.status ==200)
 {
    dispatch(addUser(response.data))
    setCookie('user',response.data.data ,{
      maxAge:  60* 60 * 24 

    });
     setCookie('refreshToken', response.data.refreshToken,{maxAge:60* 60 * 24})
    setCookie('access_token',response.data.access_token,{maxAge: 60 *15})
    setCookie('permission', JSON.stringify(response.data.permission) ,{ maxAge: 60* 60 * 24})
    localStorage.setItem('per', JSON.stringify(response.data.permission));
    dispatch(changeLoadingButton(!loading))
    if(response.data.data.role ==1)
    {
      router.push('/dashboard')
    }else{
      router.push('/')
    }

    
 }else{
  dispatch(changeLoadingButton(!loading));
  console.log('Error in Password')
  if(response.data?.msg){
    setError(response.data?.msg);
    setValidation(null)
 }
 if(response.data.error?.details){
  setValidation(response.data.error?.details.map(er=><li key={Math.random()} className='text-danger text-sm'>{er.message}</li>))
  setError(null)
}
  }}).catch(error=>{
    return null;
  })
 
console.log(error)
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
        <section className='w-full h-96 flex items-center justify-center   '>
            <div className='flex flex-col w-1/2 bg-sky-200 rounded-md shadow-xl'>
                <div className='header bg-sky-900 text-white p-3 border-b-2 border-sky-500 rounded-t-md'><h2 className={'text-2xl '+nunito.className}>Login</h2></div>
                {validation&&<ul className='text-sm text-danger  py-1 pl-5' style={{listStyleType:'circle'}}>{validation}</ul>}
                {error&&<ul className='text-sm text-danger  py-1 pl-5' style={{listStyleType:'circle'}}><li className='text-danger text-smile'>{error}</li></ul>}
                <form >
                <div className='flex items-center  p-2'>

                    <label htmlFor="email" className="px-3 text-sm w-40"> Email :</label>
                    <input type="text" onChange={setHandler} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-4/5 p-2.5  " placeholder="User Name" required/>
                 </div>
                 <div className='flex items-center p-2'>
                    <label htmlFor="password" className="px-3 text-sm w-40"> Password :</label>
                    <input type="text" id="password" name="password" onChange={setHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-4/5 p-2.5  " placeholder="User Name" required/>
                 </div>
               <div className="w-full text-center m-2"> {!loading?<button onClick={submitHandler} className='bg-sky-900 text-white p-2 rounded-md'>Login</button>:<button type='submit' className="p-2 bg-sky-800 rounded-md m-auto text-white flex items-center" disabled>Loading <ClipLoader className='mx-1' size={'20'}  color="	#FFFFFF" /></button>}  </div>
                </form>
            </div>
        </section>
    </GuestLayout>
  )
}

export default login