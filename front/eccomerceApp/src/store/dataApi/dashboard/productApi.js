import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { HYDRATE } from 'next-redux-wrapper'
// Define a service using a base URL and expected endpoints
export const dashProductApi = createApi({
  reducerPath: 'dashProductApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8800/api/dashboard/' ,credentials: 'include' } ),
 
  prepareHeaders(headers) {
    return headers;
},
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
    
  
  endpoints: (builder) => ({

    getAllProduct: builder.query({
        query: ({page=1,cookie}) =>({
      url:`products?page=${page}`,
      headers:{Cookie:cookie}})
     
      }),


      getAllProductRoute:builder.query({
        query:()=>'products/allRoutes'
      }),
      getProductSingle:builder.query({
        query:(id)=>`products/show/${id}`
      }),
      destroyProduct: builder.mutation({
        query: ({...patch}) =>({
        url: `products/destroy`,
        method:'POST',
        body:patch
      
        })
      }),
      updateProduct: builder.mutation({
        query: (patch) =>({
        url: `products/edit/${patch.id}`,
        method:'PATCH',
        body:patch
      
        })
      }),
      addProduct: builder.mutation({
        query: (formData) =>({
        url: `products/store`,
        method:'POST',
        body:formData,
        
       
       
      
        })
      }),
/*
       postCart: builder.mutation({
        query: ({id, ...patch}) =>({
        url: `cart/add`,
        method:'POST',
        body:patch
      
        })
      }),
      deleteCart: builder.mutation({
        query:({id, ...patch})=>({
        url:`cart/delete`,
        method:'POST',
        body:patch
        })
      }) 
*/
     
    
    
  }),
  async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
    const patchResult = dispatch(
        dashProductApi.util.updateQueryData('getAllProductsByCategory', id, (draft) => {
        Object.assign(draft, patch)
      })
    )
    try {
      await queryFulfilled
    } catch {
      patchResult.undo()
    }
  },
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllProductQuery,
 useAddProductMutation,
 useDestroyProductMutation,
 useGetProductSingleQuery,
 useUpdateProductMutation,
 
  util: { getRunningQueriesThunk  },
} = dashProductApi;
export const {getAllProduct,addProduct,destroyProduct,getProductSingle,getAllProductRoute,updateProduct}= dashProductApi.endpoints;