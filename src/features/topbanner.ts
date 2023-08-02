import { createSlice } from '@reduxjs/toolkit';

export const topbannerSlice = createSlice({
  name: 'banner',
  initialState: {
    value1: [{}],
    value2: [{}],
    value3: [{}],
  },
  reducers: {
    update: (state, action) => {
      state.value1 = [
        ...state.value1,
        {
          id: action.payload.id,
          altText: action.payload.altText,
          altTextCta: action.payload.altTextCta,
          backgroundColor: action.payload.backgroundColor,
          textColor: action.payload.textColor,
        },
      ];
    },
    updatemind: (state, action) => {
      state.value2 = [
        ...state.value2,
        {
          id: action.payload.id,
          text: action.payload.text,
        },
      ];
    },
    toprest: (state, action) => {
      state.value3 = [
        ...state.value3,
        {
          id: action.payload.id,
          name: action.payload.name,
          locality: action.payload.locality,
          areaname: action.payload.areaname,
          rating: action.payload.rating,
          cuisines: action.payload.cuisines,
          cost: action.payload.cost,
          totalrating: action.payload.totalrating,
          action: action.payload.action,
        },
      ];
    },
    resettop: (state, action) => {
      state.value3 = [{}];
    },
  },
});

// export const whatsonmind = createSlice({
//   name: 'whatsonmind',
//   initialState: {
//     value: { mind: [''] },
//   },
//   reducers: {
//     updatemind: (state, action) => {
//       state.value = {
//         mind: [...state.value.mind, action.payload.mind],
//       };
//     },
//   },
// });

export const { update, updatemind, toprest, resettop } = topbannerSlice.actions;

export default topbannerSlice.reducer;
