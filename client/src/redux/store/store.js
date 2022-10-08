import {configureStore} from "@reduxjs/toolkit";
import settingsReducer from "../state-slice/settingsSlice";
import productReducer from "../state-slice/productSlice"


 export default configureStore({
        reducer:{
            settings:settingsReducer,
            product:productReducer
        }
})