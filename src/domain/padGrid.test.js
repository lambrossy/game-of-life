import padGrid from "./padGrid";

describe("domain", () => {
  describe("padGrid", () => {
    test("pad grid with false cells", () => {
      const grid = [
        [true, false, true],
        [false, true, false],
        [true, false, true],
      ];
      const result = padGrid(grid);
      expect(result).toEqual([
        [false, false, false, false, false],
        [false, true, false, true, false],
        [false, false, true, false, false],
        [false, true, false, true, false],
        [false, false, false, false, false],
      ]);
    });
  });
});
