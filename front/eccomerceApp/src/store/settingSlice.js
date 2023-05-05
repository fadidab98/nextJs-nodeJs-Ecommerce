import { createSlice } from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next';



const initialState={
    setting:{
        dashToggle:false,
        filterButtonColor:false,
        filterButtonPrice:false,
        filterButtonBrand:false,
        categorySlide:false,
        frontToggle:false,
        loadingButton:false
       


    }
}

export const settingSlice = createSlice({
    name:'setting',
    initialState,
    reducers:{
        changeToggle:(state,action)=>{
            state.setting.dashToggle = !action.payload;

        },
        changeLoadingButton:(state,action)=>{
            state.setting.loadingButton = !action.payload;

        },
        changeFrontToggle:(state,action)=>{
            state.setting.frontToggle = !action.payload;

        },
        changeCategorySlide:(state,action)=>{
            state.setting.categorySlide = !action.payload;

        },
        changeColorButton:(state,action)=>{
            state.setting.filterButtonColor = !action.payload;

        },
        changePriceButton:(state,action)=>{
            state.setting.filterButtonPrice = !action.payload;

        },
        changeBrandButton:(state,action)=>{
            state.setting.filterButtonBrand = !action.payload;

        },
    }
})



const { actions, reducer } = settingSlice;
export const {changeLoadingButton,changeFrontToggle,changeToggle,changeColorButton,changePriceButton,changeBrandButton,changeCategorySlide} = actions;
export default reducer