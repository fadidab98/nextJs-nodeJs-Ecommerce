import AppLayout from "@/components/Layouts/Backend/AppLayout";
import axios from "@/lib/axios";
import { useGetAllDashboardDataQuery } from "@/store/dataApi/dashboardApi";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { cookies } from 'next/headers';


const index=()=>{
 

    return(
       <AppLayout>
         
        Dashboard
        
       </AppLayout>
    );
}

export default index


