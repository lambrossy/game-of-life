import { useState } from "react";
import update from "lodash/fp/update";
import styled from "styled-components";
import run from "./domain/run";
import mapGrid from "./domain/mapGrid";

const Controls = styled.div`
  margin: 5px;
`;

const Cell = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 5px;
  border: 1px solid grey;
  background: ${(props) => (props.alive ? "lightslategrey" : "lightgray")};
  cursor: pointer;
`;

const appCellToViewCell = (value, [y, x]) => ({
  alive: value,
  key: `${y}-${x}`,
});

const flip = (bool) => !bool;

const App = ({ initialState = [] }) => {
  const [state, setState] = useState(initialState);
  const viewState = mapGrid(appCellToViewCell, state);

  return (
    <>
      <Controls>
        <button onClick={() => setState(run(state))}>Run</button>
        <button onClick={() => setState(initialState)}>Reset</button>
      </Controls>
      <div>
        {viewState.map((y, yi) => (
          <div key={JSON.stringify(y)}>
            {y.map((x, xi) => (
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
