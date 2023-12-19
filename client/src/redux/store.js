import { combineReducers, configureStore } from "@reduxjs/toolkit";
import useReducer from "./user/userSlice.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ user: useReducer });

const persistConfiq = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfiq, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
