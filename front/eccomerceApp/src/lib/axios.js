import Axios from 'axios'
import { getCookie } from 'cookies-next';

const axios = Axios.create({
    baseURL: 'http://localhost:8800',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    
})


export default axios