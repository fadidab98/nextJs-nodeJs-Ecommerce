import CategoryHeader from '@/components/Layouts/FrontEnd/Category/CategoryHeader/CategoryHeader';
import TopProduct from '@/components/Layouts/FrontEnd/Category/TopProduct/TopProduct';
import GuestLayout from '@/components/Layouts/FrontEnd/GuestLayout';
import Head from 'next/head';
import React from 'react'

import { initializeStore, removeUndefined } from '@/store/store';
import { getAllProductsByCategory, getRunningQueriesThunk, useFilterProductMutation  } from '@/store/dataApi/productApi';


function index(props) {
  const [filterProduct,result ] = useFilterProductMutation({ fixedCacheKey: "myCacheKey" });
  const filterData = result.data;
  console.log('result',result) 
  const mainData = filterData ? filterData: props.productByProduct
  console.log(props.productByProduct)
  return (
    <GuestLayout>
      <Head>
      <meta charset="UTF-8"/>
                    <meta name="description" content="shoping Free"/>
                    <meta name="keywords" content="Shoping, Free, Online Shoping"/>
                    <meta name="author" content="Shopify"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <title>{props.productByProduct?.meta?.category_meta_title}</title>
      </Head>
        <section id="CategoryHeader">
            <CategoryHeader data={mainData} filterProduct={filterProduct} id={props.pageId}/>
        </section>
        <section id="topProduct">
          <TopProduct/>
        </section>
    </GuestLayout>
  )
}

export default index





export const getServerSideProps= async(context)=>{
  context.res.setHeader(
    'Cache-Control',
    's-maxage=10, stale-while-revalidate=59'
  )
  const category = parseInt(context.query['id']);
  const color = context.query['color[]'];
  const brand = context.query['brand[]'];
  const price = context.query['price[]'];
  console.log('categoryId',category)
      if(color || brand|| price)
      {
        const store = initializeStore();
        const page = parseInt(context.query['page']||1);
      await store.dispatch(getAllProductsByCategory.initiate({id:category,page:page}))
      await Promise.all( store.dispatch(getRunningQueriesThunk ()));
      const {data: products} = getAllProductsByCategory.select({id:category,page:page})(store.getState())
      console.log('color',color);
      console.log('brand',brand);
      console.log('price',price);
      return{ props:{initialReduxState:removeUndefined(store.getState()),productByProduct:products|| null,pageId:category }}

      }else{
        const store = initializeStore();
        const page = parseInt(context.query['page']||1);
      await store.dispatch(getAllProductsByCategory.initiate({id:category,page:page}))
      await Promise.all( store.dispatch(getRunningQueriesThunk ()));
      const {data: products} = getAllProductsByCategory.select({id:category,page:page})(store.getState())
      console.log('color',color);
      console.log('brand',brand);
      console.log('price',price);
      return{ props:{initialReduxState:removeUndefined(store.getState()),productByProduct:products|| null,pageId:category }
    }
      }

}