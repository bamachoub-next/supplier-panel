    
const initialState = {
    token: null
}

function reducer(state = initialState , action){

   
    switch(action.type){    
       case "EmployerLogin":{
           localStorage.setItem("accessToken",action.accessToken);
           localStorage.setItem("employKey",action.employKey);
           return {
              employKey:action.employKey.toString(),
              accessToken:action.accessToken
           } 
           break;        
       }
       default:{
           return initialState;
       }
   }
}
export default reducer;


/*
import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    token: null,
  }
  
const tokenSave = createSlice({
    name: 'token',
    initialState,
    reducers: {
        LoginTrueUser: (state) => {
            localStorage.setItem("token",action.token);
            return {
                 token:action.token
            }
      }
    },
  })

export default configureStore({
    reducer: {
      counter: tokenSave,
    },
  })
  */