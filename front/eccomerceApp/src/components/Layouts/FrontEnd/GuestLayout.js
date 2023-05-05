
import Head from 'next/head'
 import dynamic from 'next/dynamic'
const Navbar = dynamic(() => import('./Navbar/Navbar'));
const Footer = dynamic(() => import('.//Footer/Footer'));
import { Inter } from '@next/font/google';
import 'nprogress/nprogress.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loading from './Loading/Loading';
import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})



const GuestLayout = ({ children }) => {
 
const router = useRouter();

const [loading, setLoading] = useState(false);

useEffect(() => {
    const handleStart = () =>  setLoading(true);
    const handleComplete = () =>  setTimeout(() =>{setLoading(false)},2000);

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError',  handleComplete)


    return () => {
        router.events.off('routeChangeStart', handleStart)
        router.events.off('routeChangeComplete', handleComplete)
        router.events.off('routeChangeError', handleComplete)
    }
})



    return (<>
     <Navbar />
        <main className={inter.className + ' mastertran  '}>
          <Loading loading={loading}/>
           
          {children}
        </main>
        <Footer/>
       
 
        </>
    )
}

export default GuestLayout

