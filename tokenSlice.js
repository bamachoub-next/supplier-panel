import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    employKey: null,
    accessToken: null
  
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    saveToken: (state, action) => {
      localStorage.setItem("accessToken",action.payload.accessToken);
      localStorage.setItem("employKey",action.payload.employKey);
      state.employKey = action.payload.employKey;
      state.accessToken = action.payload.accessToken;
    }
  },
})

// Action creators are generated for each case reducer function
export const { saveToken } = tokenSlice.actions

export default tokenSlice.reducer