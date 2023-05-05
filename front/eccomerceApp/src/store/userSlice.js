import { createSlice } from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next';



const initialState={
    user:(getCookie('user')?getCookie('user'):[])
}

export const userSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        addUser:(state,action)=>{
            state.user = action.payload;

        }
    }
})



const { actions, reducer } = userSlice;
export const {addUser} = actions;
export default reducer