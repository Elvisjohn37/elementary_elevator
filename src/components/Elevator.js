import React from "react";
import "./Elevator.css";
import { useDispatch } from "react-redux";
import {
  moveUp,
  moveDown,
  changeStatus,
  changeMove,
  debarkPassengers,
  setInsidePassengers,
  requestIn,
} from "./elevator/slice";
import FloorForm from "./elevator/FloorForm";
import {
  getPassengers,
  getCurrentFloorPassengers,
  getPassengersToDebark,
  getLastFloor,
  getReverseMove,
  getUnsettledFloorTo,
  getPassengerMove,
  generateRandomFloor,
} from "./elevator/helper";

const Elevator = ({
  currentFloor,
  name,
  status,
  id,
  maxFloor,
  passengers,
  move,
}) => {
  const [isShowFloorForm, setIsShowFloorForm] = React.useState(false);
  const dispatch = useDispatch();
  const openFloorTime = 10000;
  const moveFloorTime = 10000;
  const [isFloorFrom, setIsFloorFrom] = React.useState(true);
  const [userMove, setUserMove] = React.useState(move);

  React.useEffect(() => {
    let elevatorTimeout;
    let elevatorTime = 0;
    let lastFloor;
    // Elevator's priority is to pick up the passengers on the last floor that hs passengers
    let isPriorityFrom = false;
    // Get all passengers that has same move with the current move of the elevator where the passengers floor is greater than or equal to the elevator's current floor.
    let currentMovePassengers = getPassengers(passengers, currentFloor, move);
    if (currentMovePassengers.length === 0) {
      // Reverse the elevator move
      const reverseMove = getReverseMove(move);
      // Get all passengers that has opposite move with the current move of the elevator.
      currentMovePassengers = getPassengers(
        passengers,
        currentFloor,
        reverseMove,
        true
      );
      if (currentMovePassengers.length === 0) {
        // Get all passengers that has same move with the current move of the elevator where the passengers floor is less than or equal to the elevator's current floor.
        currentMovePassengers = getPassengers(
          passengers,
          currentFloor,
          move,
          true
        );
        // Reverse the elevator's move to pick up the passengers on the previous floor.
        if (currentMovePassengers.length > 0) {
          move = reverseMove;
        }
      }
      isPriorityFrom = true;
      lastFloor = getLastFloor(currentMovePassengers, reverseMove);
      maxFloor = lastFloor;
    }
    if (currentMovePassengers.length > 0) {
      // Floor that has passengers to in or out from the elevator
      const currentFloorPassengers = getCurrentFloorPassengers(
        currentMovePassengers,
        currentFloor,
        isPriorityFrom
      );
      // The elevator will be open within 10 seconds
      if (currentFloorPassengers.length > 0) {
        dispatch(changeStatus({ id, status: "open" }));
        dispatch(setInsidePassengers({ id, currentFloor }));
        if (getUnsettledFloorTo(currentFloorPassengers).length > 0) {
          setIsShowFloorForm(true);
          setIsFloorFrom(false);
        } else {
          setIsFloorFrom(true);
        }
        elevatorTime = openFloorTime;
      }
      elevatorTimeout = setTimeout(() => {
        // Passengers to be debarked
        const passengersToDebark = getPassengersToDebark(
          currentFloorPassengers,
          currentFloor,
          move
        );
        // The elevator still have passengers
        if (currentMovePassengers.length > passengersToDebark.length) {
          currentFloor !== lastFloor &&
            dispatch(
              changeStatus({
                id,
                status: move === "up" ? "Moving Up" : "Moving Down",
              })
            );
          elevatorTimeout = setTimeout(() => {
            // Elevator will start move
            if (move === "up" && currentFloor < maxFloor) {
              dispatch(moveUp({ id }));
            } else if (move === "down" && currentFloor > 1) {
              dispatch(moveDown({ id }));
            } else {
              dispatch(changeMove({ id, move: getReverseMove(move) }));
              isPriorityFrom = false;
            }
          }, [moveFloorTime]);
        }
        // Debark the passengers
        if (passengersToDebark.length > 0) {
          dispatch(debarkPassengers({ id, passengersToDebark }));
        }
      }, elevatorTime);
    } else {
      // Elevator has no passenger
      dispatch(changeStatus({ id, status: "stay" }));
      setIsFloorFrom(true);
      setIsShowFloorForm(false);
    }
    return () => clearTimeout(elevatorTimeout);
  }, [currentFloor, passengers, move]);

  const handleUserMove = (move) => {
    if (move === "up") {
      setIsFloorFrom(true);
      setIsShowFloorForm(true);
      setUserMove("up");
    } else {
      setIsFloorFrom(true);
      setIsShowFloorForm(true);
      setUserMove("down");
    }
  };

  const handleRandomCall = () => {
    const randomFloorFrom = generateRandomFloor(1, maxFloor);
    dispatch(
      requestIn({
        id,
        floorFrom: generateRandomFloor(1, maxFloor),
        floorTo: generateRandomFloor(1, maxFloor, randomFloorFrom),
        isDefaultFloorTo: false,
      })
    );
  };

  return (
    <div className="Elevator" onClick={() => null}>
      <div className="Elevator-move-requests">
        <ul>
          {passengers.map((getOutSidePassenger, index) => (
            <li key={index}>{`"${getPassengerMove(
              getOutSidePassenger.floorFrom,
              getOutSidePassenger.floorTo
            )}" request on floor ${
              getOutSidePassenger.floorFrom
            } received`}</li>
          ))}
        </ul>
      </div>
      <div className="Elevator-car">
        <div className="Elevator-name">{name}</div>
        <div className="Elevator-status">{status}</div>
        <div className="Elevator-current-floor">{currentFloor}</div>
      </div>
      <div className="Elevator-move">
        {isShowFloorForm ? (
          <FloorForm
            elevatorId={id}
            currentFloor={currentFloor}
            maxFloor={maxFloor}
            minFloor={1}
            isFloorFrom={isFloorFrom}
            userMove={userMove}
            onSubmit={() => setIsShowFloorForm(false)}
          />
        ) : (
          <>
            <button onClick={() => handleUserMove("up")}>UP</button>
            <button onClick={() => handleUserMove("down")}>DOWN</button>
            <button onClick={() => handleRandomCall()}>Random passenger</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Elevator;
