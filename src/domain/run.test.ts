import Coordinates from "../types/Coordinates";
import Grid from "../types/Grid";
import run, { rules } from "./run";

describe("domain", () => {
  describe("rules", () => {
    test("live cell with no live neighbours dies", () => {
      const grid: Grid = [
        [false, false, false],
        [false, true, false],
        [false, false, false],
      ];
      const cell: Coordinates = [1, 1];
      const result: boolean = rules(grid)(cell);
      expect(result).toBe(false);
    });

    test("live cell with one live neighbours dies", () => {
      const grid: Grid = [
        [false, false, false],
        [true, true, false],
        [false, false, false],
      ];
      const cell: Coordinates = [1, 1];
      const result: boolean = rules(grid)(cell);
      expect(result).toBe(false);
    });

    test("live cell with two live neighbours lives", () => {
      const grid: Grid = [
        [false, true, false],
        [true, true, false],
        [false, false, false],
      ];
      const cell: Coordinates = [1, 1];
      const result: boolean = rules(grid)(cell);
      expect(result).toBe(true);
    });

    test("live cell with three live neighbours lives", () => {
      const grid: Grid = [
        [false, true, false],
        [true, true, true],
        [false, false, false],
      ];
      const cell: Coordinates = [1, 1];
      const result: boolean = rules(grid)(cell);
      expect(result).toBe(true);
    });

    test("live cell with four live neighbours dies", () => {
      const grid: Grid = [
        [false, true, false],
        [true, true, true],
        [false, true, false],
      ];
      const cell: Coordinates = [1, 1];
      const result: boolean = rules(grid)(cell);
      expect(result).toBe(false);
    });

    test("dead cell with three live neighbours lives", () => {
      const grid: Grid = [
        [false, true, false],
        [true, false, true],
        [false, false, false],
      ];
      const cell: Coordinates = [1, 1];
      const result: boolean = rules(grid)(cell);
      expect(result).toBe(true);
    });
  });

  describe("game", () => {
    test("meets requirements as provided in https://user-images.githubusercontent.com/7149052/53603476-bfb00e00-3c05-11e9-8862-1dfd31836dcd.jpg", () => {
      const first: Grid = [
        [false, false, false, false, false, false],
        [false, false, true, false, false, false],
        [false, false, false, true, false, false],
        [false, true, true, true, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
      ];

      const second: Grid = run(first);
      expect(second).toEqual([
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, true, false, true, false, false],
        [false, false, true, true, false, false],
        [false, false, true, false, false, false],
        [false, false, false, false, false, false],
      ]);

      const third: Grid = run(second);
      expect(third).toEqual([
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, true, false, false],
        [false, true, false, true, false, false],
        [false, false, true, true, false, false],
        [false, false, false, false, false, false],
      ]);

      const fourth = run(third);
      expect(fourth).toEqual([
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, true, false, false, false],
        [false, false, false, true, true, false],
        [false, false, true, true, false, false],
        [false, false, false, false, false, false],
      ]);

      const fifth: Grid = run(fourth);
      expect(fifth).toEqual([
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, true, false, false],
        [false, false, false, false, true, false],
        [false, false, true, true, true, false],
        [false, false, false, false, false, false],
      ]);
    });
  });
});
