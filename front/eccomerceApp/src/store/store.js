import { configureStore ,combineReducers } from '@reduxjs/toolkit'

import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
import users from './userSlice';
import setting from './settingSlice'
import { productApi } from './dataApi/productApi';
// create your reducer
import { useMemo } from 'react'
import counter from './CounterSlice';
import { cartApi } from './dataApi/cartApi';
import { dashboardApi } from './dataApi/dashboardApi';
import { dashCategoryApi } from './dataApi/dashboard/categoryApi';
import { usersDashApi } from './dataApi/dashboard/usersApi';
import { dashProductApi } from './dataApi/dashboard/productApi';
import { permissionApi } from './dataApi/dashboard/permissionApi';

let store

const initialState = {}

const reducer =combineReducers({
  [productApi.reducerPath]:productApi.reducer,
  [cartApi.reducerPath]:cartApi.reducer,
  [dashboardApi.reducerPath]:dashboardApi.reducer,
  [dashCategoryApi.reducerPath]:dashCategoryApi.reducer,
  [usersDashApi.reducerPath]:usersDashApi.reducer,
  [dashProductApi.reducerPath]:dashProductApi.reducer,
  [permissionApi.reducerPath]:permissionApi.reducer,
  setting:setting,
  users:users,
  counter:counter,

  

 
});
function initStore(preloadedState = initialState) {
  return configureStore({
   reducer:reducer,
   preloadedState,
   
  
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([productApi.middleware,cartApi.middleware,dashboardApi.middleware,dashCategoryApi.middleware,usersDashApi.middleware,dashProductApi.middleware,permissionApi.middleware]),

  });
}
export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}
export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
export function removeUndefined(state) {
  if (typeof state === 'undefined') return null
  if (Array.isArray(state)) return state.map(removeUndefined)
  if (typeof state === 'object' && state !== null) {
    return Object.entries(state).reduce((acc, [key, value]) => {
      return {
        ...acc,
        [key]: removeUndefined(value)
      }
    }, {})
  }

  return state
}
