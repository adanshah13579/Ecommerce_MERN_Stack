import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage by default
import authReducer from "./auth-slice";
import adminProductsSlice from "./admin/products-slice";
import adminOrderSlice from "./admin/order-slice";
import shopProductsSlice from "./shop/products-slice";
import shopCartSlice from "./shop/cart-slice";
import shopAddressSlice from "./shop/address-slice";
import shopOrderSlice from "./shop/order-slice";
import shopSearchSlice from "./shop/search-slice";
import shopReviewSlice from "./shop/review-slice";
import commonFeatureSlice from "./common-slice";

// Redux persist configuration for specific reducers
const persistConfig = {
  key: 'root',   // root key for local storage
  storage,       // storage method (localStorage in this case)
  whitelist: ['auth', 'shopCart'],  // The slices you want to persist
};

// Combine your reducers
const rootReducer = {
  auth: authReducer,
  adminProducts: adminProductsSlice,
  adminOrder: adminOrderSlice,
  shopProducts: shopProductsSlice,
  shopCart: shopCartSlice,
  shopAddress: shopAddressSlice,
  shopOrder: shopOrderSlice,
  shopSearch: shopSearchSlice,
  shopReview: shopReviewSlice,
  commonFeature: commonFeatureSlice,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

// Configure store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  // Disable serialization checks for redux-persist
    }),
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
