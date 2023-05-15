import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { HYDRATE } from 'next-redux-wrapper'
// Define a service using a base URL and expected endpoints
export const dashOrderApi = createApi({
  reducerPath: 'dashOrderApi',
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

    getAllOrder: builder.query({
        query: ({page=1,cookie}) =>({
      url:`orders?page=${page}`,
      headers:{Cookie:cookie}})
     
      }),
      getAllOrderId:builder.query({
        query:()=>({
          url:`orders/all_id`,

        })
      }),
      getOrderById:builder.query({
        query:(id)=>({
          url:`orders/show/${id}`,

        })
      }),
      getAllProducts:builder.query({
        query:(ids)=>({
          url:`orders/show_products/${ids}`,

        })
      }),
      updateOrder: builder.mutation({
        query: (patch) =>({
        url: `orders/edit/${patch.id}`,
        method:'PATCH',
        body:patch
      
        })
      }),
    

    
  }),

})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllOrderQuery,
  useGetAllOrderIdQuery,
 useUpdateOrderMutation,
 useGetOrderByIdQuery,
 useGetAllProductsQuery,
  util: { getRunningQueriesThunk  },
} = dashOrderApi;
export const {getAllOrder,updateOrder,getAllOrderId,getOrderById,getAllProducts}= dashOrderApi.endpoints;