import { createSlice } from '@reduxjs/toolkit';

export const resturantsSlice = createSlice({
  name: 'resturants',
  initialState: {
    value: [{}],
    menu: [{}],
  },
  reducers: {
    resturants: (state, action) => {
      state.value = [
        ...state.value,
        {
          id: action.payload.id,
          name: action.payload.name,
          locality: action.payload.locality,
          areaName: action.payload.areaName,
          cost: action.payload.cost,
          cuisines: action.payload.cuisines,
          rating: action.payload.rating,
          totalrating: action.payload.totalrating,
          deliverytime: action.payload.deliverytime,
          avaliability: action.payload.avaliability,
        },
      ];
    },
    menuupdate: (state, action) => {
      if (state.menu.length == 1) {
        state.menu = [
          {
            id: action.payload.id,
            name: action.payload.name,
            locality: action.payload.locality,
            areaName: action.payload.areaName,
            cost: action.payload.cost,
            cuisines: action.payload.cuisines,
            rating: action.payload.rating,
            totalrating: action.payload.totalrating,
            deliverytime: action.payload.deliverytime,
            distance: action.payload.distance,
          },
          ...state.menu,
        ];
        console.log(state.menu);
      } else {
        const index = state.menu.findIndex(
          (item) => item.title === action.payload.title,
        );
        console.log(index);
        if (index !== -1) {
          state.menu[index].items = [
            ...state.menu[index].items,
            {
              id: action.payload.id,
              name: action.payload.name,
              description: action.payload.description,
              price: action.payload.price,
              category: action.payload.category,
            },
          ];
        } else {
          state.menu = [
            ...state.menu,
            {
              title: action.payload.title,
              items: [
                {
                  id: action.payload.id,
                  name: action.payload.name,
                  description: action.payload.description,
                  price: action.payload.price,
                  category: action.payload.category,
                },
              ],
            },
          ];
        }
      }
    },
    resetmenu: (state, action) => {
      console.log('yes');
      state.menu = [{}];
    },
    resetres: (state, action) => {
      state.value = [{}];
    },
  },
});

export const { resturants, menuupdate, resetmenu, resetres } =
  resturantsSlice.actions;

export default resturantsSlice.reducer;
