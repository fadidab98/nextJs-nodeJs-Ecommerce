
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
export const productApi = createApi({
  reducerPath: 'productApi',
  
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8800/api/' ,credentials: 'include'} ),
    extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({

    getAllProductsByCategory: builder.query({
        query: ({id,page=1}) =>`product/${id}?page=${page}`,
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName
        },
      }),
      filterProduct: builder.mutation({
        query:(patch)=>({
          url: `product/filter`,
          method:'POST',
          body:patch
        })
      }),
      getProductById:builder.query({
        query:(id)=>`product/details/${id}`
      }),
    
      getAllProducts:builder.query({
        query:()=>'product/all/products'
      }),
    
    
    
  }),
  async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
    const patchResult = dispatch(
        productApi.util.updateQueryData('getAllProductsByCategory', id, (draft) => {
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
  useGetAllProductsByCategoryQuery,
  useFilterProductMutation,
  util: { getRunningQueriesThunk  },
} = productApi;
export const {getAllProductsByCategory,getAllCategory,getAllProducts,getProductById,filterProduct}= productApi.endpoints;