import { useState, FC } from "react";
import update from "lodash/fp/update";
import styled from "styled-components";
import run from "./domain/run";
import mapGrid from "./domain/mapGrid";
import Cell from "./components/Cell/Cell";
import CellProps from "./interfaces/CellProps";
import Coordinates from "./types/Coordinates";
import Grid from "./types/Grid";

const Controls = styled.div`
  margin: 5px;
`;

const appCellToViewCell = (value: boolean, [y, x]: Coordinates): CellProps => ({
  alive: value,
  key: `${y}-${x}`,
});

const flip = (bool: boolean): boolean => !bool;

interface Props {
  initialState: Grid;
}

const App: FC<Props> = ({ initialState }) => {
  const [state, setState] = useState(initialState);
  const viewState = mapGrid(appCellToViewCell, state);

  return (
    <>
      <Controls>
        <button onClick={() => setState(run(state))}>Run</button>
        <button onClick={() => setState(initialState)}>Reset</button>
      </Controls>
      <div>
        {viewState.map((y: CellProps[], yi: number) => (
          <div key={JSON.stringify(y)}>
            {y.map((x: CellProps, xi: number) => (
              <Cell
                {...x}
                data-testid={x.alive ? "alive" : "dead"}
                onClick={() => setState(update([yi, xi], flip, state))}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
