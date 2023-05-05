import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { HYDRATE } from 'next-redux-wrapper'
// Define a service using a base URL and expected endpoints

export const usersDashApi = createApi({
  reducerPath: 'usersDashApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8800/api/dashboard/' ,credentials: 'include'} ),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
    
  
  endpoints: (builder) => ({
    getAllUsersRoutes: builder.query({
      query: () =>(`users/routes`),
    }),
    getUser: builder.query({
      query: (id) =>(`users/show/${id}`),
    }),
    getAllUsers: builder.query({
        query: ({page=1,cookie}) =>({
          url:`users?page=${page}`,
          headers:{Cookie:cookie}}),
        
      }),
      addUser:builder.mutation({
        query:(patch)=>({
          url:'users/store',
          method:'POST',
          body:patch

        })
      }),
      updateUser:builder.mutation({
        query:(patch)=>({
          url:`users/edit/${patch.id}`,
          method:'POST',
          body:patch

        })
      }),
      deleteUser:builder.mutation({
        query:({...patch})=>({
          url:`users/destroy`,
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
        usersDashApi.util.updateQueryData('getAllProductsByCategory', id, (draft) => {
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
    useGetAllUsersQuery,
    useGetAllUsersRoutesQuery,
    useGetUserQuery,
    useAddUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation,
  util: { getRunningQueriesThunk  },
} = usersDashApi;
export const {getAllUsers,getAllUsersRoutes,getUser,addUser,updateUser}= usersDashApi.endpoints;