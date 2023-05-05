import '../../styles/globals.css'
import axios from 'axios'
import { useStore } from '@/store/store';
import { Provider } from 'react-redux';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loading from '@/components/Layouts/FrontEnd/Loading/Loading';
import 'nprogress/nprogress.css';
/* axios */


axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token =getCookie("access_token");
  console.log('token app',token)
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
/*End Axios */
/* Nprogress */

export default function App(props) {
  const Component = props.Component
  console.log('app', props?.product)
  const store = useStore(props.pageProps.initialReduxState)

  const accessToken = getCookie('access_token')

useEffect(()=>{
  const refreshToken = getCookie('refreshToken')

  if(refreshToken )
  {
    axios.post('http://localhost:8800/api/refresh',{refreshToken}).then(res=>{
      console.log('refreshToken From App',res.data.refreshToken)
        setCookie('refreshToken',res.data.refreshToken,{maxAge: 60 *60 *1000})
        
        setCookie('access_token',res.data.access_token,{maxAge: 24 *60 *60 *1000})
          setCookie('permission', JSON.stringify(res.data.permission) ,{ maxAge: 60* 60 * 24});
        
        console.log('access_token From App',res.data.access_token)
      })
  }
   
},[accessToken])
  return ( <Provider store={store}>
    
  <Component {...props.pageProps} />
</Provider>)
}

/* server auth */

 
