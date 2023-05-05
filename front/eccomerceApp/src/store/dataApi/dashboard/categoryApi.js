import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { HYDRATE } from 'next-redux-wrapper'
// Define a service using a base URL and expected endpoints
export const dashCategoryApi = createApi({
  reducerPath: 'dashCategoryApi',

  baseQuery: fetchBaseQuery({
     baseUrl: 'http://localhost:8800/api/dashboard/',
     credentials: 'include',
    
    
    } ),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  
  
  endpoints: (builder) => ({

    getAllCategory: builder.query({
        query: ({page=1,cookie}) =>({url:`category?page=${page}`,
      headers:{
        Cookie:cookie 
      }
      }),
    
       
      }),
      getAllCategoryId: builder.query({
        query:()=> '/category/routes'
       }),
       destroyCategory: builder.mutation({
        query:({...patch})=> ({
          url:`category/destroy`,
          method:'POST',
          body:patch
        })
       }),
       getCategoryById: builder.query({
        query:(id)=> `category/show/${id}`
       }),
      postCategory: builder.mutation({
        query: ({id, ...patch}) =>({
        url: `category/store`,
        method:'POST',
        body:patch
      
        })
      }),
      updateCategory: builder.mutation({
        query: (patch) =>({
        url: `category/edit/${patch.id}`,
        method:'PATCH',
        body:patch
      
        })
      }),

 /*      postCart: builder.mutation({
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
      }) */
     
    
    
  }),
  async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
    const patchResult = dispatch(
        dashCategoryApi.util.updateQueryData('getAllProductsByCategory', id, (draft) => {
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
  useGetAllCategoryQuery,
  usePostCategoryMutation,
  useGetAllCategoryIdQuery,
  useGetCategoryByIdQuery,
  useDestroyCategoryMutation,
  useUpdateCategoryMutation,
  util: { getRunningQueriesThunk  },
} = dashCategoryApi;
export const {getAllCategory,postCategory,getAllCategoryId,getCategoryById,destroyCategory,updateCategory}= dashCategoryApi.endpoints;