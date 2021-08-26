import get from "lodash/fp/get";

// Given a function and a grid, applies the function to every cell in the grid
const mapGrid = (fn, grid) =>
  grid.map((y, yi) => y.map((_, xi) => fn(get([yi, xi], grid), [yi, xi])));

export default mapGrid;
