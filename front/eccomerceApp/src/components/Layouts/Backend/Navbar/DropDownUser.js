import axios from 'axios';
import { deleteCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import {GrLogout} from 'react-icons/gr'
import {FiSettings} from 'react-icons/fi'

function DropDownUser() {

    useEffect(() => {
        const use = async () => {
          (await import('tw-elements')).default;
            };
            use();
          }, []);
          const router = useRouter()
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

  return (
    <div className="relative" data-te-dropdown-ref>
    <a
      className="hidden-arrow mr-4 flex items-center text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
      href="#"
      id="dropdownMenuButton1"
      role="button"
      data-te-dropdown-toggle-ref
      aria-expanded="false">
{/* image */}
    <button className="rounded-full w-10 h-10 relative ">
                <Image src='https://res.cloudinary.com/dg2c3liap/image/upload/v1678023049/user_jhtp2p.png' layout="fill" objectFit="cover" alt="No Image"/>
            </button>
    </a>
    <ul
      className="absolute left-auto right-0 z-[1000] float-left m-0 mt-1 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block w-40"
      aria-labelledby="dropdownMenuButton1"
      data-te-dropdown-menu-ref>
      <li>
        <a
          className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
        
          data-te-dropdown-item-ref
          >
            <div  className='flex items-center'><span className='pr-1'><FiSettings/></span> Setting</div>
          </a>
      </li>
    
      <li>
        <a
          className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30 "
         
          data-te-dropdown-item-ref
          ><button onClick={logout} className='flex items-center w-full'><span className='pr-1'><GrLogout/></span> Logout</button></a >
      </li>
    </ul>
  </div>
  )
}

export default DropDownUser