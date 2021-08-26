import run, { rules } from "./run";

describe("domain", () => {
  describe("rules", () => {
    test("live cell with no live neighbours dies", () => {
      const grid = [
        [false, false, false],
        [false, true, false],
        [false, false, false],
      ];
      const cell = [1, 1];
      const result = rules(grid)(cell);
      expect(result).toBe(false);
    });

    test("live cell with one live neighbours dies", () => {
      const grid = [
        [false, false, false],
        [true, true, false],
        [false, false, false],
      ];
      const cell = [1, 1];
      const result = rules(grid)(cell);
      expect(result).toBe(false);
    });

    test("live cell with two live neighbours lives", () => {
      const grid = [
        [false, true, false],
        [true, true, false],
        [false, false, false],
      ];
      const cell = [1, 1];
      const result = rules(grid)(cell);
      expect(result).toBe(true);
    });

    test("live cell with three live neighbours lives", () => {
      const grid = [
        [false, true, false],
        [true, true, true],
        [false, false, false],
      ];
      const cell = [1, 1];
      const result = rules(grid)(cell);
      expect(result).toBe(true);
    });

    test("live cell with four live neighbours dies", () => {
      const grid = [
        [false, true, false],
        [true, true, true],
        [false, true, false],
      ];
      const cell = [1, 1];
      const result = rules(grid)(cell);
      expect(result).toBe(false);
    });

    test("dead cell with three live neighbours lives", () => {
      const grid = [
        [false, true, false],
        [true, false, true],
        [false, false, false],
      ];
      const cell = [1, 1];
      const result = rules(grid)(cell);
      expect(result).toBe(true);
    });
  });

  describe("game", () => {
    test("meets requirements as provided in https://user-images.githubusercontent.com/7149052/53603476-bfb00e00-3c05-11e9-8862-1dfd31836dcd.jpg", () => {
      const first = [
        [false, false, false, false, false, false],
        [false, false, true, false, false, false],
        [false, false, false, true, false, false],
        [false, true, true, true, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
      ];

      const second = run(first);
      expect(second).toEqual([
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, true, false, true, false, false],
        [false, false, true, true, false, false],
        [false, false, true, false, false, false],
        [false, false, false, false, false, false],
      ]);

      const third = run(second);
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

      const fifth = run(fourth);
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
