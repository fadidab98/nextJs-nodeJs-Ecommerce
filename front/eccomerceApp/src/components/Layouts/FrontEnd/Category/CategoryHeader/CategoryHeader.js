import Filter from '@/components/FilterBar/Filter'
import { useGetAllProductsByCategoryQuery } from '@/store/dataApi/productApi'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import CardLoading from '../../Loading/CardLoading'

import Pagination from '../../Pagination/Pagination'
const  Card =dynamic(()=>import('../../Card/Card'),{
  loading: ()=><div>loading ...</div>
})

/* import Card from ''
 */
function CategoryHeader(props) {
  const router = useRouter();  
  const {id} =router.query;
 useEffect(() => {
    const use = async () => {
            (await import('tw-elements')).default;
        };
        use();
      }, []);
 
  return (
    <div className='w-full flex flex-wrap  justify-between px-2 pt-4 '>
      <div className='xl:w-1/5 lg:w-1/5 md:w-1/5 sm:w-screen flex flex-col '>
          <Filter filterProduct={props.filterProduct}/>
          </div>
        <div className=' xl:w-4/5 lg:w-4/5 md:w-4/5 md:w-4/5 sm:w-screen w-auto'>
        
          <div className='w-full flex justify-center flex-wrap  '>

            
              {
                props.data?.status == 204 ?(
                  <div className='w-full h-auto flex items-center justify-center'>
                    <h2 className='text-2xl text-gray-400'>No Content</h2>
                  </div>
                ):(
                  props.data?.data?.map(product=>{
                    const {...data1} = product
                    return  <Card key={Math.random()} data={data1}/>
                  })
                )
              
               
            
          
            }
            
          
          
        
          </div>

            {/* pagination */}
        <div className='my-5' ><Pagination data={props.data?.pagination} id={props.id}/></div>
        </div>
    </div>
  )
}

export default CategoryHeader