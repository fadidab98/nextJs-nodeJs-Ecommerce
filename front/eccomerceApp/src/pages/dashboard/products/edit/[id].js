import AppLayout from "@/components/Layouts/Backend/AppLayout"
import EditPills from "@/components/Layouts/Backend/Product/EditPills/EditPills";
import Pills from "@/components/Layouts/Backend/Product/pills/Pills";
import { getAllProductRoute, getRunningQueriesThunk, useGetProductSingleQuery } from "@/store/dataApi/dashboard/productApi";
import { initializeStore } from "@/store/store";
import { useEffect } from "react";
export const getStaticPaths=async()=>{
    const store = initializeStore();

    await store.dispatch(getAllProductRoute.initiate());
    await Promise.all(store.dispatch(getRunningQueriesThunk()))


    const {data:routes} = getAllProductRoute.select()(store.getState())

    const paths = routes.data?.map( item=>{
        return{params:{id:item.id?.toString()}}})



        return{
            paths:paths,
            fallback:'blocking'
        }

}
export const getStaticProps=async(ctx)=>{
        const {id} = ctx.params


            return{
                props:{id},
                revalidate:10
            }
    }   


const index=(props)=>{
  
    return(<AppLayout>
            <EditPills  data={props.id}/>

    </AppLayout>)
}


export default index