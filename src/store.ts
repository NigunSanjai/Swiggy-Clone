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
