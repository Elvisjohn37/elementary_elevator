const getPassengers = (
  passengers,
  currentFloor,
  move,
  isAllPassengers = false
) =>
  passengers.filter((passenger) => {
    if (move === "up") {
      let result = passenger.floorFrom < passenger.floorTo;
      if (isAllPassengers) {
        return result;
      } else {
        return (
          (result && currentFloor <= passenger.floorFrom) || passenger.isInside
        );
      }
    } else {
      let result = passenger.floorFrom > passenger.floorTo;
      if (isAllPassengers) {
        return result;
      } else {
        return (
          (result && currentFloor >= passenger.floorTo) || passenger.isInside
        );
      }
    }
  });

const getCurrentFloorPassengers = (passengers, currentFloor, isPriorityFrom) =>
  passengers.filter((passenger) => {
    if (isPriorityFrom) {
      return passenger.floorFrom === currentFloor;
    } else {
      return (
        passenger.floorFrom === currentFloor ||
        passenger.floorTo === currentFloor
      );
    }
  });

const getPassengersToDebark = (passengers, currentFloor, move) =>
  passengers.filter((passenger) =>
    move === "up"
      ? passenger.floorFrom < passenger.floorTo &&
        currentFloor === passenger.floorTo
      : passenger.floorFrom > passenger.floorTo &&
        currentFloor === passenger.floorTo
  );

const getLastFloor = (passengers, move) => {
  if (move === "up") {
    return Math.min(...passengers.map((passenger) => passenger.floorFrom));
  } else {
    return Math.max(...passengers.map((passenger) => passenger.floorFrom));
  }
};

const getPassengerMove = (floorFrom, floorTo) =>
  floorFrom > floorTo ? "down" : "up";

const getUnsettledFloorTo = (passengers) =>
  passengers.filter((passenger) => passenger.isDefaultFloorTo);

const getReverseMove = (move) => (move === "up" ? "down" : "up");

const generateRandomFloor = (minFloor, maxFloor, exclude = 0) => {
  let randomFloor =
    Math.floor(Math.random() * (maxFloor - minFloor)) + minFloor;

  if (randomFloor === exclude) {
    randomFloor = generateRandomFloor(minFloor, maxFloor, exclude);
  }

  return randomFloor;
};

export {
  getPassengers,
  getCurrentFloorPassengers,
  getPassengersToDebark,
  getLastFloor,
  getReverseMove,
  getUnsettledFloorTo,
  getPassengerMove,
  generateRandomFloor,
};
