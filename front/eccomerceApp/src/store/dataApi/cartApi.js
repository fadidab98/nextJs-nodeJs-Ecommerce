import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { HYDRATE } from 'next-redux-wrapper'
// Define a service using a base URL and expected endpoints
export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8800/api/' ,credentials: 'include'} ),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
    
  
  endpoints: (builder) => ({

    getCart: builder.query({
        query: () =>`cart/show`,
      
        
      }),
      countCart: builder.query({
        query: () =>`cart/count`,
      
        
      }),
      postCart: builder.mutation({
        query: ({id, ...patch}) =>({
        url: `cart/add`,
        method:'POST',
        body:patch
      
        })
      }),
      postCheckOut: builder.mutation({
        query: ({id, ...patch}) =>({
        url: `stripe/create-checkout-session`,
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
     
    
    
  }),
  async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
    const patchResult = dispatch(
        cartApi.util.updateQueryData('getAllProductsByCategory', id, (draft) => {
        Object.assign(draft, patch)
      })
    )
    try {
      await queryFulfilled
    } catch {
      patchResult.undo()

      /**
       * Alternatively, on failure you can invalidate the corresponding cache tags
       * to trigger a re-fetch:
       * dispatch(api.util.invalidateTags(['Post']))
       */
    }
  },
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCartQuery,
  usePostCartMutation,
  useDeleteCartMutation,
  useCountCartQuery,
  usePostCheckOutMutation,

  util: { getRunningQueriesThunk  },
} = cartApi;
export const {getCart,countCart,postCheckOut}= cartApi.endpoints;