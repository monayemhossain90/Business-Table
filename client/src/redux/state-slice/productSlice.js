import {createSlice} from "@reduxjs/toolkit";

export const ProductSlice = createSlice({
    name:"product",
    initialState:{
        Total:0,
        AllProduct:[]

    },
    reducers:{
        SetTotal:(state,action)=>{
            state.Total = action.payload;
        },
        SetAllProduct:(state,action)=>{
            state.AllProduct = action.payload;
        }
    }
})

export const {SetTotal,SetAllProduct} = ProductSlice.actions;
export default  ProductSlice.reducer;
