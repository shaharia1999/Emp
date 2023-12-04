import { createSlice } from "@reduxjs/toolkit";

const initialState={
    value:[]
}

export const InvoiceSlice=createSlice({
   name:'Payment',
   initialState,
   reducers:{
    Add:(state,action)=>{
        //    state=[...state,action.payload]
        // state.push(action.payload)
        return {
            ...state,
            value: [ action.payload],
          };
    }
   }
})
export const {Add} = InvoiceSlice.actions;
  
export default InvoiceSlice.reducer;
  