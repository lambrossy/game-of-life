import get from "lodash/fp/get";
import Coordinates from "../types/Coordinates";
import Grid from "../types/Grid";

// Given a function and a grid, applies the function to every cell in the grid
const mapGrid = (
  fn: (value: boolean, coords: Coordinates) => any,
  grid: Grid
) => grid.map((y, yi) => y.map((_, xi) => fn(get([yi, xi], grid), [yi, xi])));

export default mapGrid;
