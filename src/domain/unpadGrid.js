import head from "lodash/fp/head";
import tail from "lodash/fp/tail";
import last from "lodash/fp/last";
import initial from "lodash/fp/initial";
import compose from "lodash/fp/compose";
import update from "lodash/fp/update";
import zipAll from "lodash/fp/zipAll";

const transpose = zipAll;
const trim = compose(initial, tail);
const or = (left) => (right) => left || right;

const foldEnds = (list) => {
  const trimmed = trim(list);
  const lastIndex = trimmed.length - 1;
  const firstToLast = update(lastIndex, or(head(list)), trimmed);
  const lastToFirst = update(0, or(last(list)), firstToLast);
  return lastToFirst;
};

// Given a grid, unpads grid and wraps any live cells to the other end of the grid
const unpadGrid = (grid) => {
  const foldColumns = grid.map(foldEnds);
  const foldRows = transpose(foldColumns).map(foldEnds);
  return transpose(foldRows);
};

export default unpadGrid;
