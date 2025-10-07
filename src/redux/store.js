import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,} from "redux-persist";
import vehicleSlice from "./vehicleSlice";
import fuelTypeSlice from "./fuelTypeSlice";
import vehicleTypesSlice from "./vehicleTypesSlice";
import errorMiddleware from "./errorMiddleware";


const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    vehicles: vehicleSlice,
    fuelTypes: fuelTypeSlice,
    vehicleTypes: vehicleTypesSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(errorMiddleware),
})

export const persistor = persistStore(store)
export default store