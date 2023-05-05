import { createSlice } from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next';



const initialState={
    counter:0
}

export const counterSlice = createSlice({
    name:'counter',
    initialState,
    reducers:{
        Increase:(state,action)=>{
            state.counter += 1;

        },
        Decrease:(state,action)=>{
            if(state.counter >=1)
            {
                state.counter -= 1;
            }
            else{
                state.counter = 0
            }
           
           
            
        }
    }
})



const { actions, reducer } = counterSlice;
export const {Increase,Decrease} = actions;
export default reducer