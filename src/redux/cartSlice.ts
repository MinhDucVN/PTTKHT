import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  name: string;
  price: number;
  image: string;
  quantity: number; // Thêm thuộc tính số lượng
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.name === action.payload.name
      );
      if (existingItem) {
        existingItem.quantity += 1; // Nếu sản phẩm đã có, tăng số lượng
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    subToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.name === action.payload.name
      );
      if (existingItem) {
        existingItem.quantity -= 1; // Nếu sản phẩm đã có, tăng số lượng
      } 
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart, subToCart } = cartSlice.actions;
export default cartSlice.reducer;
