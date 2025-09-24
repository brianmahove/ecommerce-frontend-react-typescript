// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { productSlice } from './slices/productSlice';
import { cartSlice } from './slices/cartSlice';
import { userSlice } from './slices/userSlice';
import { filterSlice } from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    user: userSlice.reducer,
    filters: filterSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;