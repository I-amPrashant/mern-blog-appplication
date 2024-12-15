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
        updateStart:(state)=>{
            state.loading=true,
            state.error=false
        },
        updateSuccess:(state, action)=>{
            state.currentUser=action.payload,
            state.loading=false,
            state.error=false
        },
        updateFailure:(state, action)=>{
            state.loading=false,
            state.error=action.payload
        },
        deleteUserStart:(state)=>{
            state.loading=true,
            state.error=false
        },
        deleteUserSuccess:(state)=>{
            state.currentUser=null,
            state.loading=false,
            state.error=false
        },
        deleteUserFailure:(state, action)=>{
            state.loading=false,
            state.error=action.payload
        },
        signoutSuccess:(state)=>{
            state.currentUser=null,
            state.loading=false,
            state.error=false
        }
    }
})

export const {signInStart, signInSuccess, signInFailure, navigation, updateStart, updateSuccess, updateFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signoutSuccess}=userSlice.actions;

export default userSlice.reducer;