import { render, screen, within } from "@testing-library/react";
import Elevator from "./Elevator";
import { Provider } from "react-redux";
import store from "./../redux/store";

describe("<Elevator />", () => {
  let defaultProps = {
    currentFloor: 1,
    name: "elevator1",
    status: "stay",
    id: "1",
    maxFloor: "10",
    passengers: [],
    move: "up",
  };

  it("Should render snapshot", () => {
    let { asFragment } = render(
      <Provider store={store}>
        <Elevator {...defaultProps} />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("Should have name", () => {
    render(
      <Provider store={store}>
        <Elevator {...defaultProps} />
      </Provider>
    );
    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
  });

  it("Should have floor indicator", () => {
    render(
      <Provider store={store}>
        <Elevator {...defaultProps} />
      </Provider>
    );
    expect(screen.getByText(defaultProps.currentFloor)).toBeInTheDocument();
  });

  it("Should start move when containing passengers", () => {
    defaultProps = {
      ...defaultProps,
      passengers: [{ floorFrom: 1, floorTo: 10 }],
    };
    render(
      <Provider store={store}>
        <Elevator {...defaultProps} />
      </Provider>
    );
    expect(screen.getByText(defaultProps.currentFloor)).toBeInTheDocument();
  });
});
