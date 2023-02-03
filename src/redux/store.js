import { configureStore } from "@reduxjs/toolkit";
import elevatorSlice from "./../components/elevator/slice";

const store = configureStore({
  reducer: {
    elevator: elevatorSlice,
  },
});

export default store;
