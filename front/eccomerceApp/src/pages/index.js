import Head from 'next/head'
import { Inter } from '@next/font/google'
import dynamic from 'next/dynamic';
import Loading from '@/components/Layouts/FrontEnd/Loading/Loading';
import { getCookie } from 'cookies-next';
import { useSelector } from 'react-redux';
const Header = dynamic(()=>import('@/components/Layouts/FrontEnd/HomePage/Header'),{ssr:false,loading:()=><div>loading</div>});
const GuestLayout = dynamic(() => import('@/components/Layouts/FrontEnd/GuestLayout'), {
    ssr: false,
    loading: () => <Loading />
  });
  const HomeCategory = dynamic(()=> import('@/components/Layouts/FrontEnd/HomePage/HomeCategory'),{ssr:false});
const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  console.log("data from cookie ",getCookie('user'));
  const  user = useSelector((state)=>state.users.user)
  console.log("data from redux ",user);
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
            <section id="header">
              <Header/>
            </section>
            <section id="HomeCategory"><HomeCategory/></section>
           
        </GuestLayout>
  )
}
