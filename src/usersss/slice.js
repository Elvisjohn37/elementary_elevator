import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      id: 1,
      currentFloor: 1,
      debarkFloor: null,
    },
  ],
  myUserId: 1,
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentFloor: (state, action) => {
      state.users = state.users.map((user) => {
        if (user.id === action.payload.id) {
          user.currentFloor = action.payload.currentFloor;
        }
        return user;
      });
    },
    updateCurrentFloor: (state, action) => {
      const updatedUserIds = action.payload.debarkPassengers.map(
        (debarkPassenger) => {
          return debarkPassenger.userId;
        }
      );

      state.users = state.users.map((user) => {
        if (updatedUserIds.includes(user.id)) {
          user.currentFloor = action.payload.currentFloor;
        }
        return user;
      });
    },
  },
});

export const getCurrentFloor = (state, userId) => {
  return state.users.users.filter((user) => user.id === userId)[0] || {};
};

export const { setCurrentFloor, updateCurrentFloor } = slice.actions;

export default slice.reducer;
