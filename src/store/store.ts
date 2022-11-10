import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { postApi } from "../services/PostService";
import { authUser } from "../services/AuthUser";
import { productApi } from "../services/ProductService";
import { extraApi } from "../services/ExtraService";
import modalReducer from "./reducers/ModalSlice"
import userReducer from './reducers/UserSlice'
import smModalReducer from './reducers/SmModalSlice'
import loaderReducer from './reducers/LoaderSlice'
import filterReducer from './reducers/ProductFilter'
import FilterModalReducer from "./reducers/FilterModalSlice";
import storage from 'redux-persist/lib/storage'
import {persistStore, persistReducer} from 'redux-persist'

const rootReducer = combineReducers({
    modalReducer,
    userReducer,
    smModalReducer,
    loaderReducer,
    filterReducer,
    FilterModalReducer,
    [productApi.reducerPath]: productApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [authUser.reducerPath]: authUser.reducer,
    [extraApi.reducerPath]: extraApi.reducer
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
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
        .concat(postApi.middleware, authUser.middleware, productApi.middleware, extraApi.middleware)
    })
}

export const persistor = persistStore(setupStore())

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']