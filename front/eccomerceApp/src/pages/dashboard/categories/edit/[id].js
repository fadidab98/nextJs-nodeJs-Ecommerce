import AppLayout from "@/components/Layouts/Backend/AppLayout"
import EditPills from "@/components/Layouts/Backend/Category/EditPills/EditPills";
import { getAllCategoryId, getRunningQueriesThunk } from "@/store/dataApi/dashboard/categoryApi";
import { initializeStore } from "@/store/store";
import { useEffect } from "react";
export const getStaticPaths=async()=>{
    const store = initializeStore();

    await store.dispatch(getAllCategoryId.initiate());
    await Promise.all(store.dispatch(getRunningQueriesThunk()))


    const {data:routes} = getAllCategoryId.select()(store.getState())

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
                props:{id}
            }
    }   


const index=(props)=>{
  
    return(<AppLayout>
             <EditPills  data={props.id}/>

           </AppLayout>)
}


export default index