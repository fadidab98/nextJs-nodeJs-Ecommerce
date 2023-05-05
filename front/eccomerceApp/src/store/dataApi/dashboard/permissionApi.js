import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { HYDRATE } from 'next-redux-wrapper'
// Define a service using a base URL and expected endpoints

export const permissionApi = createApi({
  reducerPath: 'permissionApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8800/api/dashboard/' ,credentials: 'include'} ),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
    
  
  endpoints: (builder) => ({
   
    getAllPermissions: builder.query({
      query: () =>`permissions`,
    }),
   getAllUserPermissions:builder.query({
    query:(id)=>({
      url:`/permissions/userPermission/${id}`
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
        permissionApi.util.updateQueryData('getAllProductsByCategory', id, (draft) => {
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
    useGetAllPermissionsQuery,
    useGetAllUserPermissionsQuery,
  util: { getRunningQueriesThunk  },
} = permissionApi;
export const {getAllPermissions,getAllUserPermissions}= permissionApi.endpoints;