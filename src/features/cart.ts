import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: [{}],
  },
  reducers: {
    addcart: (state, action) => {
      state.value = [
        ...state.value,
        {
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          quantity: 1,
          totalprice: action.payload.price,
        },
      ];
    },
    updatecart: (state, action) => {
      const index = state.value.findIndex(
        (item) => item.id === action.payload.id,
      );
      state.value[index] = {
        ...state.value[index],
        quantity: Number(state.value[index].quantity) + 1,
        totalprice:
          Number(state.value[index].quantity) *
          Number(state.value[index].price),
      };
    },
    deletecart: (state, action) => {
      const index = state.value.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (state.value[index].quantity == 1) {
        console.log(state.value[index]);
        state.value = state.value.filter(
          (item) => item.id != action.payload.id,
        );
        return;
      } else if (state.value[index].quantity > 1) {
        state.value[index] = {
          ...state.value[index],
          quantity: Number(state.value[index].quantity) - 1,
          totalprice:
            Number(state.value[index].quantity) *
            Number(state.value[index].price),
        };
      }
    },
  },
});

export const { addcart, deletecart, updatecart } = cartSlice.actions;

export default cartSlice.reducer;
