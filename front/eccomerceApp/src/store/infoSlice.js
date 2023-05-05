import { createSlice } from '@reduxjs/toolkit'


const initialState={
    cart:[]
}



export const cartSlice = createSlice({
    name:'cart',
    initialState:{
        information:[]
    },
    reducers:{
        addInfo:(state,action)=>{
            state.information = action.payload
        }
    }
})



const { actions, reducer } = cartSlice;
export const {addInfo} = actions;
export default reducer