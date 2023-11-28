import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: true,
  };
  
  export const drawerSlice = createSlice({
    name: "drawer",
    initialState,
    reducers: {
      True: (state) => {
        state.value = true;
      },
      False: (state) => {
        state.value = false;
      },
    },
  });
  
  // Destructure the actions from createSlice
  export const { True, False } = drawerSlice.actions;
  
  export default drawerSlice.reducer;
  