import { configureStore } from '@reduxjs/toolkit';
import UserrReducer from './Reducers/UserrReducer';




export const Store = configureStore({
  reducer: {
    UserrReducer: UserrReducer,
  },

});



export default Store;
