import times from "lodash/fp/times";
import stubFalse from "lodash/fp/stubFalse";

// Given a grid, pads all sides with false values
const padGrid = (grid) => {
  const rowLength = grid.length;
  const yPadding = times(stubFalse, rowLength + 2);
  return [yPadding, ...grid.map((y) => [false, ...y, false]), yPadding];
};

export default padGrid;
