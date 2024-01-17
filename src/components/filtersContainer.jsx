import { useReducer } from "react";
import { reducer } from "../JSscripts/reducer";
import SaveToFile from "./saveToFlie";
import L2buttons from "./L2buttons";
import L4pbuttons from "./L4pbuttons";
import L3buttons from "./L3buttons";
import CacheSection from "./Cache";
export default function FiltersContainer() {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <>
      <div id="filtersContainer" className="container OPandF">
        <h2>Filters</h2>
        <br />
        <div
          className="row"
          style={{ borderTop: "0.5px solid aliceblue", padding: "2% 0" }}
        >
          <div className="col-md filter">
            <h5>Layer 2</h5>
            <L2buttons dispatch={dispatch} />
          </div>
          <div className="col-md filter">
            <h5>Layer 3</h5>
            <L3buttons dispatch={dispatch} />
          </div>
          <div className="col-md filter">
            <h5>Layer 4+</h5>
            <L4pbuttons dispatch={dispatch} />
          </div>
        </div>
      </div>

      <br />
      <SaveToFile />

      <br />
      <CacheSection cmdState={state} />
      <br />
    </>
  );
}
