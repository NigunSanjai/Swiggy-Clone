import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userdata';
import topbannerReducer from './features/topbanner';
import locationReducer from './features/location';
import resturantsReducer from './features/resturants';
import cartReducer from './features/cart';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = configureStore({
  reducer: {
    user: userReducer,
    topbanner: topbannerReducer,
    location: locationReducer,
    resturants: resturantsReducer,
    cart: cartReducer,
  },
});
// This is the Redux store, which is the global state management system for the app.
//  The user state is managed by the userReducer, which is imported from the userdata slice.
//   The topbanner state is managed by the topbannerReducer, which is imported from the topbanner slice.
//    The location state is managed by the locationReducer, which is imported from the location slice.
//     The resturants state is managed by the resturantsReducer, which is imported from the resturants slice.
//      The cart state is managed by the cartReducer, which is imported from the cart slice.