import head from "lodash/fp/head";
import tail from "lodash/fp/tail";
import last from "lodash/fp/last";
import initial from "lodash/fp/initial";
import compose from "lodash/fp/compose";
import update from "lodash/fp/update";
import Grid from "../types/Grid";

// https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
const transpose = (columns: any[][]) =>
  columns[0].map((_, colIndex: number) =>
    columns.map((row: any[]) => row[colIndex])
  );

const trim = compose(initial, tail);

const or =
  (left: boolean = false) =>
  (right: boolean = false): boolean =>
    left || right;

const foldEnds = (list: boolean[]): boolean[] => {
  const trimmed = trim(list);
  const lastIndex = trimmed.length - 1;
  const firstToLast = update(lastIndex, or(head(list)), trimmed);
  const lastToFirst = update(0, or(last(list)), firstToLast);
  return lastToFirst;
};

// Given a grid, unpads grid and wraps any live cells to the other end of the grid
const unpadGrid = (grid: Grid): Grid => {
  const foldColumns = grid.map(foldEnds);
  const foldRows = transpose(foldColumns).map(foldEnds);
  return transpose(foldRows);
};

export default unpadGrid;
