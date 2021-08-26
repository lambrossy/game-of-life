import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const grid = [
    [false, false, false],
    [true, true, true],
    [false, false, false],
  ];
  render(<App initialState={grid} />);
  const alive = screen.queryAllByTestId("alive");
  const dead = screen.queryAllByTestId("dead");
  expect(alive).toHaveLength(3);
  expect(dead).toHaveLength(6);
});
