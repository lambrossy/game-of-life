import times from "lodash/fp/times";
import stubFalse from "lodash/fp/stubFalse";
import Grid from "../types/Grid";

// Given a grid, pads all sides with false values
const padGrid = (grid: Grid): Grid => {
  const rowLength: number = grid.length;
  const yPadding: boolean[] = times(stubFalse, rowLength + 2);
  return [yPadding, ...grid.map((y) => [false, ...y, false]), yPadding];
};

export default padGrid;
