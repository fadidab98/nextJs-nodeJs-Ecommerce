import AppLayout from '@/components/Layouts/Backend/AppLayout'
import UserCard from '@/components/Layouts/Backend/User/UserCard/UserCard';
import { getAllUsersRoutes, useGetUserQuery } from '@/store/dataApi/dashboard/usersApi';
import { getRunningQueriesThunk } from '@/store/dataApi/dashboardApi';
import { initializeStore } from '@/store/store';
import { useRouter } from 'next/router';
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
    const {data} = useGetUserQuery(props.id);
    console.log('user',data)


  return (
 
    <AppLayout>
        <UserCard data={data}/>
    </AppLayout>
  );
  }
export default index