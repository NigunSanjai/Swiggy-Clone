import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: {
      name: '',
      email: '',
      latitude: '11.101782',
      longitude: '77.345192',
      resturantid: '',

      item: [
        {
          productname: '',
          resturant: '',
          quantity: 0,
          priceperitem: 0,
        },
      ],
    },
  },
  reducers: {
    location: (state, action) => {
      state.value = {
        ...state.value,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    },

    login: (state, action) => {
      state.value = {
        ...state.value,
        name: action.payload.name,
        email: action.payload.email,
      };
    },
    setres: (state, action) => {
      state.value = {
        ...state.value,
        resturantid: action.payload.resturantid,
      };
    },
  },
});

export const { login, location, setres } = userSlice.actions;

export default userSlice.reducer;
