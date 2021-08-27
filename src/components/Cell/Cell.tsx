import styled from "styled-components";
import CellProps from "../../interfaces/CellProps";

const Cell = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 5px;
  border: 1px solid grey;
  background: ${(props: CellProps) =>
    props.alive ? "lightslategrey" : "lightgray"};
  cursor: pointer;
`;

export default Cell;
