import get from "lodash/fp/get";
import cond from "lodash/fp/cond";
import stubTrue from "lodash/fp/stubTrue";
import stubFalse from "lodash/fp/stubFalse";
import mapGrid from "./mapGrid";
import padGrid from "./padGrid";
import unpadGrid from "./unpadGrid";
import Grid from "../types/Grid";
import Coordinates from "../types/Coordinates";

const neighbouringCellCoordinates = ([y, x]: Coordinates) => [
  [y, x + 1],
  [y, x - 1],
  [y + 1, x],
  [y - 1, x],
  [y + 1, x + 1],
  [y - 1, x - 1],
  [y + 1, x - 1],
  [y - 1, x + 1],
];

const getNeighbours = (cell: Coordinates, grid: Grid): boolean[] =>
  neighbouringCellCoordinates(cell).map((coord) => get(coord, grid));

const lessThanTwoLiveNeighbours =
  (grid: Grid) =>
  (cell: Coordinates): boolean => {
    const live = get(cell, grid);
    const liveNeighbours = getNeighbours(cell, grid).filter(Boolean);
    return live && liveNeighbours.length < 2;
  };

const twoOrThreeLiveNeighbours =
  (grid: Grid) =>
  (cell: Coordinates): boolean => {
    const live = get(cell, grid);
    const liveNeighbours = getNeighbours(cell, grid).filter(Boolean);
    return live && (liveNeighbours.length === 2 || liveNeighbours.length === 3);
  };

const moreThanThreeLiveNeighbours =
  (grid: Grid) =>
  (cell: Coordinates): boolean => {
    const live = get(cell, grid);
    const liveNeighbours = getNeighbours(cell, grid).filter(Boolean);
    return live && liveNeighbours.length > 3;
  };

const deadWithThreeLiveNeighbours =
  (grid: Grid) =>
  (cell: Coordinates): boolean => {
    const live = get(cell, grid);
    const liveNeighbours = getNeighbours(cell, grid).filter(Boolean);
    return !live && liveNeighbours.length === 3;
  };

const dies = stubFalse;
const lives = stubTrue;
const otherwise = stubTrue;

export const rules = (...deps: [Grid]) =>
  cond([
    [lessThanTwoLiveNeighbours(...deps), dies],
    [twoOrThreeLiveNeighbours(...deps), lives],
    [moreThanThreeLiveNeighbours(...deps), dies],
    [deadWithThreeLiveNeighbours(...deps), lives],
    [otherwise, dies],
  ]);

const run = (grid: Grid): Grid => {
  // Pad the grid with false value to see if any cells come to life off-grid
  const paddedGrid = padGrid(grid);

  // Apply the rules to each cell
  const updatedGrid = mapGrid(
    (_: any, coord: Coordinates) => rules(paddedGrid)(coord),
    paddedGrid
  );

  // Unpad the grid, wrapping any live cells
  const unpaddedGrid = unpadGrid(updatedGrid);
  return unpaddedGrid;
};

export default run;
