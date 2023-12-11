import { createSlice } from "@reduxjs/toolkit";

const initialState={
    value:null
}
export const SelarySlice=createSlice({
    name:'Selary',
    initialState,
    reducers:{
        Payment:(state,action)=>{
            return {
                ...state,
                value: [ action.payload],
              };
        }
    }
})
 export const {Payment}=SelarySlice.actions;
 export default SelarySlice.reducer