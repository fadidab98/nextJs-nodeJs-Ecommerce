import AppLayout from "@/components/Layouts/Backend/AppLayout";
import CategoryCard from "@/components/Layouts/Backend/Category/categoryCard/CategoryCard";
import { getAllCategoryId, getCategoryById, getRunningQueriesThunk, useGetCategoryByIdQuery } from "@/store/dataApi/dashboard/categoryApi";
import { initializeStore } from "@/store/store";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";




/* getstaticPaths */
export const getStaticPaths =async()=>{
    const store = initializeStore();

    await store.dispatch(getAllCategoryId.initiate())
    await Promise.all(store.dispatch(getRunningQueriesThunk()))

    const {data:categoryId} = getAllCategoryId.select()(store.getState())

    const paths = categoryId?.data?.map(id=>{
        return{ params : { id : id.id?.toString()}}
    });
    return{
        paths:paths,
        fallback:'blocking'
      }
}
export const getStaticProps=async(context)=>{
    const {id} = context.params;

    
    return{ 
         props:{id},
         revalidate:10
        }
  }

const index =(props)=>{

    const {data} = useGetCategoryByIdQuery(props.id)
      
    return(
    <AppLayout>
        <CategoryCard data={data} id={props.id}/> 
    </AppLayout>
    )
}


export default index