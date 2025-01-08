import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import orderReucer from './orderSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReucer,
  },
});

export default store;
