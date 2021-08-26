import unpadGrid from "./unpadGrid";

describe("domain", () => {
  describe("unpadGrid", () => {
    // TODO: Confirm requirements
    test("unpad grid with a few live cells", () => {
      const grid = [
        [false, false, true, false, false],
        [false, false, false, false, false],
        [true, false, false, false, false],
        [false, false, true, false, false],
        [false, false, false, false, false],
      ];
      const result = unpadGrid(grid);
      expect(result).toEqual([
        [false, false, false],
        [false, false, true],
        [false, true, false],
      ]);
    });
  });
});
