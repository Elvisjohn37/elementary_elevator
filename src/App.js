import "./App.css";
import Elevator from "./components/Elevator";
import React from "react";
import { useSelector } from "react-redux";

function App() {
  const elevators = useSelector((state) => state.elevator.elevators);
  const [isDisplayCalls, setIsDisplayCalls] = React.useState(false);

  React.useEffect(() => setIsDisplayCalls(false), [isDisplayCalls]);

  return (
    <div className="App">
      <header className="App-header">Elementary elevator control system</header>
      <div className="App-elevator">
        {elevators.map(
          ({
            id,
            currentFloor,
            name,
            status,
            passengers,
            move,
            hasOutFloor,
          }) => (
            <Elevator
              key={id}
              currentFloor={currentFloor}
              name={name}
              status={status}
              id={id}
              maxFloor={10}
              passengers={passengers}
              move={move}
              hasOutFloor={hasOutFloor}
            />
          )
        )}
      </div>
    </div>
  );
}

export default App;
