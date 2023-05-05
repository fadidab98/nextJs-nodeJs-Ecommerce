
import { HYDRATE } from 'next-redux-wrapper'
// Define a service using a base URL and expected endpoints
import {
  buildCreateApi,
  coreModule,
  fetchBaseQuery,
  reactHooksModule,
} from '@reduxjs/toolkit/query/react'
const createApi = buildCreateApi(
  coreModule(),
  reactHooksModule({ unstable__sideEffectsInRender: true })
)
export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  
baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8800/api/' ,credentials: 'include'} ),
extractRehydrationInfo(action, { reducerPath }) {
  if (action.type === HYDRATE) {
    return action.payload[reducerPath]
  }
},
  endpoints: (builder) => ({

    getAllDashboardData: builder.query({
        query: () =>`checkAdmin`,
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName
        },
      }),
    
      
    
    
  }),
  async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
    const patchResult = dispatch(
        dashboardApi.util.updateQueryData('getAllDashboardData', id, (draft) => {
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
  useGetAllDashboardDataQuery,
  
  util: { getRunningQueriesThunk  },
} = dashboardApi;
export const {getAllDashboardData}= dashboardApi.endpoints;