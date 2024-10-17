import {combineReducers, configureStore} from "@reduxjs/toolkit"
import userReducer from "./UserSlice.js"
import formReducer from "./FormSlice.js"
import storage from "redux-persist/lib/storage"
import {persistReducer,persistStore} from "redux-persist"


const persistConfig = {
    key:"root",
    storage,
    version:1,
}

const rootReducers = combineReducers({
    userReducer,
    formReducer
})

const persistedReducer = persistReducer(persistConfig,rootReducers);

const store = configureStore({
    reducer:persistedReducer,

    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false,
    }),
})

const persistor = persistStore(store);

export {store, persistor}