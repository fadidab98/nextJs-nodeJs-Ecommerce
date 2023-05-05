import GuestLayout from '@/components/Layouts/FrontEnd/GuestLayout';
import ProductDetails from '@/components/Layouts/FrontEnd/ProductDetails/ProductDetails';
import { getAllProducts, getProductById, getRunningQueriesThunk } from '@/store/dataApi/productApi';
import { initializeStore } from '@/store/store';
import Head from 'next/head';
import { useRouter } from 'next/router'
import React from 'react'

/* PATHS */
export const getStaticPaths =async()=>{
  const store = initializeStore()
  await store.dispatch(getAllProducts.initiate())
  await Promise.all( store.dispatch(getRunningQueriesThunk ()));
    const {data:products} = getAllProducts.select()(store.getState());
    const paths = products.data?.map(product=>{
        return{ params : { id:product.id?.toString()}}
    })

    return{
      paths:paths,
      fallback:false
    }
}
/* STATIC PROPS */
export const getStaticProps=async(context)=>{
  const {id} = context.params;
  console.log("id",id)
  const store = initializeStore();
  await store.dispatch(getProductById.initiate(id));
  await Promise.all(store.dispatch(getRunningQueriesThunk()))
  const {data:details} = getProductById.select(id)(store.getState());
  return{  props:{product:details.data},revalidate:10}

}








function index(props) {
  const data = props.product[0]
    const router = useRouter();
    const {id } = router.query  
      return (
        <GuestLayout>
             <Head>
            <meta charset="UTF-8"/>
                    <meta name="description" content={data.meta_description}/>
                    <meta name="keywords" content="Shoping, Free, Online Shoping"/>
                    <meta name="author" content="Shopify"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                                    <title>Shopify | {data.meta_title}</title>
            </Head>
            <ProductDetails data={data}/>
    </GuestLayout>
  )
}

export default index


