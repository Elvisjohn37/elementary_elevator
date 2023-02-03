import React from "react";
import { useDispatch } from "react-redux";
import { requestIn, requestOut } from "./slice";

const FloorForm = ({
  isFloorFrom,
  elevatorId,
  maxFloor,
  minFloor,
  onSubmit,
  userMove,
  currentFloor,
}) => {
  const [floor, setFloor] = React.useState(1);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
    if (isFloorFrom) {
      dispatch(
        requestIn({
          id: elevatorId,
          floorFrom: parseInt(floor),
          floorTo: userMove === "up" ? maxFloor : minFloor,
        })
      );
    } else if (currentFloor <= parseInt(floor)) {
      dispatch(requestOut({ id: elevatorId, floorTo: parseInt(floor) }));
    }
  };
  return (
    <div className="FloorForm">
      <form onSubmit={handleSubmit}>
        {isFloorFrom
          ? "Enter your current floor"
          : "Enter your floor destination"}
        <input
          type="number"
          max={maxFloor}
          min={minFloor}
          value={floor}
          onChange={(event) => setFloor(event.target.value)}
        />
      </form>
    </div>
  );
};

export default FloorForm;
