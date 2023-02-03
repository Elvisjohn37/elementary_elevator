import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  elevators: [
    {
      id: 1,
      name: "elevator1",
      currentFloor: 1,
      status: "stay",
      move: "up",
      // hasOutFloor: false,
      passengers: [
        {
          floorFrom: 10,
          floorTo: 1,
        },
        {
          floorFrom: 4,
          floorTo: 8,
        },
        // {
        //   floorFrom: 3,
        //   floorTo: 5,
        // },
        // {
        //   floorFrom: 6,
        //   floorTo: 2,
        // },
      ],
    },
    {
      id: 2,
      name: "elevator2",
      currentFloor: 1,
      status: "stay",
      move: "up",
      // hasOutFloor: false,
      passengers: [
        // {
        //   floorFrom: 4,
        //   floorTo: 8,
        // },
      ],
    },
    {
      id: 3,
      name: "elevator3",
      currentFloor: 1,
      status: "stay",
      move: "up",
      // hasOutFloor: false,
      passengers: [],
    },
    {
      id: 4,
      name: "elevator4",
      currentFloor: 1,
      status: "stay",
      move: "up",
      // hasOutFloor: false,
      passengers: [],
    },
  ],
};

const filterByElevatorId = (elevators, elevatorId, updateState) => {
  return elevators.map((elevator) => {
    if (elevator.id === elevatorId) {
      updateState(elevator);
    }
    return elevator;
  });
};

const slice = createSlice({
  name: "elevator",
  initialState: initialState,
  reducers: {
    moveUp: (state, action) => {
      state.elevators = filterByElevatorId(
        state.elevators,
        action.payload.id,
        (elevator) => {
          elevator.currentFloor += 1 || elevator.currentFloor;
        }
      );
    },
    moveDown: (state, action) => {
      state.elevators = filterByElevatorId(
        state.elevators,
        action.payload.id,
        (elevator) => {
          elevator.currentFloor -= 1 || elevator.currentFloor;
          elevator.status = "moving down";
        }
      );
    },
    debarkPassengers: (state, action) => {
      state.elevators = filterByElevatorId(
        state.elevators,
        action.payload.id,
        (elevator) => {
          const passengersToDebark = action.payload.passengersToDebark;
          elevator.passengers = elevator.passengers.filter(
            (passenger) =>
              !passengersToDebark.find(
                (debark) =>
                  passenger.floorTo === debark.floorTo &&
                  passenger.isInside === debark.isInside
              )
          );
        }
      );
    },
    stay: (state, action) => {
      state.elevators = filterByElevatorId(
        state.elevators,
        action.payload.id,
        (elevator) => {
          elevator.status = "stay";
        }
      );
    },
    changeStatus: (state, action) => {
      state.elevators = filterByElevatorId(
        state.elevators,
        action.payload.id,
        (elevator) => {
          elevator.status = action.payload.status;
        }
      );
    },
    changeMove: (state, action) => {
      state.elevators = filterByElevatorId(
        state.elevators,
        action.payload.id,
        (elevator) => {
          elevator.move = action.payload.move;
        }
      );
    },
    requestIn: (state, action) => {
      state.elevators = filterByElevatorId(
        state.elevators,
        action.payload.id,
        (elevator) => {
          elevator.passengers.push({
            floorFrom: action.payload.floorFrom,
            floorTo: action.payload.floorTo,
            isDefaultFloorTo: true,
            isInside: false,
          });
        }
      );
    },
    setInsidePassengers: (state, action) => {
      state.elevators = filterByElevatorId(
        state.elevators,
        action.payload.id,
        (elevator) => {
          return elevator.passengers.map((passenger) => {
            if (passenger.floorFrom === action.payload.currentFloor) {
              passenger.isInside = true;
            }
            return passenger;
          });
        }
      );
    },
    requestOut: (state, action) => {
      state.elevators = filterByElevatorId(
        state.elevators,
        action.payload.id,
        (elevator) => {
          elevator.passengers.map((passenger) => {
            if (passenger.isDefaultFloorTo) {
              passenger.floorTo = action.payload.floorTo;
              passenger.isDefaultFloorTo = false;
            }
            return passenger;
          });
        }
      );
    },
  },
});

export const {
  moveUp,
  moveDown,
  stay,
  changeMove,
  changeStatus,
  requestIn,
  requestOut,
  debarkPassengers,
  setInsidePassengers,
} = slice.actions;

export default slice.reducer;
