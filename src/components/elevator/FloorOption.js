import React from "react";
import "./FloorOption.css";
import { useSelector } from "react-redux";

const FloorOption = ({ elevatorId, currentFloor }) => {
  const [floorNumber, setFloorNumber] = React.useState();
  const [isDisplayCalls, setIsDisplayCalls] = React.useState(false);
  const users = useSelector((state) => state.users);
  const userId = users.myUserId;
  const user = users.users.filter((user) => user.id == userId)[0] || null;

  React.useEffect(() => setIsDisplayCalls(false), [isDisplayCalls]);

  const requestAction = (event) => {
    event.preventDefault(event);
    setIsDisplayCalls(true);
  };

  const handleChange = (event) => {
    setFloorNumber(event);
  };

  return (
    <div className="FloorOption">
      <form onSubmit={(event) => requestAction(event)}>
        <label>Enter floor number: </label>
        <input
          type="number"
          max={10}
          min={1}
          onChange={(event) => handleChange(event.target.value)}
        />
      </form>
    </div>
  );
};

export default FloorOption;
