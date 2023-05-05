import { useCountCartQuery } from '@/store/dataApi/cartApi';
import { changeFrontToggle } from '@/store/settingSlice';
import { Nunito } from '@next/font/google';
import axios from 'axios';
import { deleteCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {FaOpencart} from 'react-icons/fa';
import {GoThreeBars} from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';

const nunito = Nunito({
    subsets: ['latin'],
    display: 'swap',
  }) 
const  AuthUser=()=> {
  const router = useRouter();
  const {data} = useCountCartQuery();
  const dispatch = useDispatch();
  const toggle = useSelector(state=>state.setting.setting.frontToggle)
  const logout=async(e)=>{

    axios.post('http://localhost:8800/api/logout',{withCredentials:'includes'}).then(res=>{
      if(res.status ==200)
      {
        deleteCookie('access_token');
        deleteCookie('refreshToken');
        deleteCookie('permission');
        deleteCookie('user');
        localStorage.removeItem('per');

        router.push('/login')
      }
    })
  }
  console.log('cart',data?.data)
  return (
    <>
    <ul className={nunito.className +' flex items-center'}>
            <li className='px-2 hover:text-sky-300'><Link href="/cart"><div className=' relative flex' style={{fontSize:'2.99rem'}}><FaOpencart /> <span className='absolute left-3 top-3 text-lg  rounded-md text-teal-400 '>{data?.data?.length}</span></div></Link></li>
            <li className='px-2 hover:text-sky-300'><button onClick={logout} href="/logout">Logout</button></li>
            <li className='px-2 hover:text-sky-300 xl:hidden lg:hidden'><button onClick={()=>dispatch(changeFrontToggle(toggle))}><GoThreeBars size={34}/></button></li>
    </ul>
    </>
  )
}

export default AuthUser