import AppLayout from '@/components/Layouts/Backend/AppLayout'
import EditPills from '@/components/Layouts/Backend/User/EditPills/EditPills';
import { getAllUsersRoutes, getRunningQueriesThunk } from '@/store/dataApi/dashboard/usersApi';
import { initializeStore } from '@/store/store'
import React from 'react'
export const getStaticPaths = async()=>{
        const store = initializeStore();

        await store.dispatch(getAllUsersRoutes.initiate())

        await Promise.all(store.dispatch(getRunningQueriesThunk()))

        const {data:users } = getAllUsersRoutes.select()(store.getState());
        const paths = users.data?.map(id=>{
            return{ params:{id:id?.id?.toString()}}
        });
        console.log('users id',paths)
        return{
            paths:paths,
            fallback:'blocking'
        }


}

export const getStaticProps =async(context)=>{
        const id = context.params.id
        console.log('users id',id)
        return {
            props:{id},
            revalidate:10
        }
}
function index(props) {
  return (
    <AppLayout>
      <EditPills id={props.id}/>
    </AppLayout>
  )
}

export default index