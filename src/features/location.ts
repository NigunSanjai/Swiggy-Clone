import { createSlice } from '@reduxjs/toolkit';

export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    value: {
      latitude: '',
      longitude: '',
      name: '',
      place_formatted: '',
    },
  },
  reducers: {
    setlocation: (state, action) => {
      state.value = {
        ...state.value,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        name: action.payload.name,
        place_formatted: action.payload.place_formatted,
      };
    },
  },
});
//setlocation is used to set the location of the user


export const { setlocation } = locationSlice.actions;

export default locationSlice.reducer;
