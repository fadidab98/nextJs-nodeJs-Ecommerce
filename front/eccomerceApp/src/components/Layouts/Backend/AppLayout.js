import axios from "@/lib/axios"
import { useGetAllDashboardDataQuery } from "@/store/dataApi/dashboardApi"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Loading from "../FrontEnd/Loading/Loading"
import Navbar from "./Navbar/Navbar"
import SideBar from "./SideBar/SideBar"

const AppLayout = ({ children }) => {
    const router = useRouter()
    const {data, error,isLoading} = useGetAllDashboardDataQuery()
    console.log('error',error?.status)
    const [loading,setLoading] = useState(false)
    
      if(error?.status == 403)
      {
       router.push("/")
      }
        const toggle = useSelector(state=>state.setting.setting.dashToggle)
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
if(isLoading)
{
   return <div>loading</div>
}
    return (
        <div className="min-h-screen bg-gray-100">
                      <Loading loading={loading}/>

            <SideBar/>
           <Navbar/> 

           

            <main className="flex justify-between">
            
                <div className={`${toggle?'ml-24':'ml-60'} w-full bg-white duration-300 `}>
                {children}

                </div>
                
                </main>
        </div>
    )
}

export default AppLayout
