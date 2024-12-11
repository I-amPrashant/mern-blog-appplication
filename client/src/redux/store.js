import {configureStore, combineReducers} from '@reduxjs/toolkit'
import userReducer from '../user/userSlice.js'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'
import {createFilter} from 'redux-persist-transform-filter'

const rootReducer=combineReducers({
    user:userReducer,
})

const filterUser=createFilter('user', ['currentUser']);

const persistConfig={
    key:'root',
    storage,
    version:1,
    whitelist:['user'],
    transforms:[filterUser],
}

const persistedReducer=persistReducer(persistConfig, rootReducer)

export const store=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false}),
})

export const persistor=persistStore(store);