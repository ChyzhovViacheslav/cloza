import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { postApi } from "../services/PostService";
import modalReducer from "./reducers/ModalSlice"
import userReducer from './reducers/UserSlice'
import smModalReducer from './reducers/SmModalSlice'
import loaderReducer from './reducers/LoaderSlice'
import filterReducer from './reducers/ProductFilter'
import storage from 'redux-persist/lib/storage'
import {persistStore, persistReducer} from 'redux-persist'

const rootReducer = combineReducers({
    modalReducer,
    userReducer,
    smModalReducer,
    loaderReducer,
    filterReducer,
    [postApi.reducerPath]: postApi.reducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userReducer', 'filterReducer']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const setupStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(postApi.middleware)
    })
}

export const persistor = persistStore(setupStore())

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']