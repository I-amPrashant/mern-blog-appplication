import {createSlice} from '@reduxjs/toolkit'

const initialState={
    currentUser:null,
    error:false,
    loading:false,
}
 const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        navigation:(state)=>{
            state.loading=false,
            state.error=false
        },
        signInStart:(state)=>{
            state.loading=true,
            state.error=false
        },
        signInSuccess:(state, action)=>{
            state.currentUser=action.payload,
            state.loading=false,
            state.error=false
        },
        signInFailure:(state, action)=>{
            state.loading=false,
            state.error=action.payload
        },

    }
})

export const {signInStart, signInSuccess, signInFailure, navigation}=userSlice.actions;

export default userSlice.reducer;