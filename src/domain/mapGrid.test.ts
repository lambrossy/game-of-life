import Coordinates from "../types/Coordinates";
import Grid from "../types/Grid";
import mapGrid from "./mapGrid";

describe("utilities", () => {
  describe("mapGrid", () => {
    test("applies provided function in every cell of grid", () => {
      const fn = (value: boolean, coord: Coordinates) => ({ value, coord });
      const grid: Grid = [
        [true, false, true],
        [false, true, false],
        [true, false, true],
      ];
      const result: Grid = mapGrid(fn, grid);
      expect(result).toEqual([
        [
          { value: true, coord: [0, 0] },
          { value: false, coord: [0, 1] },
          { value: true, coord: [0, 2] },
        ],
        [
          { value: false, coord: [1, 0] },
          { value: true, coord: [1, 1] },
          { value: false, coord: [1, 2] },
        ],
        [
          { value: true, coord: [2, 0] },
          { value: false, coord: [2, 1] },
          { value: true, coord: [2, 2] },
        ],
      ]);
    });
  });
});
