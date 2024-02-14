import { useState, useEffect } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

export default function CheckBox({
  title,
  flagOption,
  filename,
  disableCondition,
  defaultValue,
  flagLogic,
}) {
  function HOSTandSERVICE() {
    if (state1 == "true" && state2 == "true") {
      document.getElementById("bashHS").textContent = "";
    } else if (state1 == "false" && state2 == "true") {
      document.getElementById("bashHS").textContent = "n";
    } else if (state1 == "false" && state2 == "false") {
      document.getElementById("bashHS").textContent = "nn";
    }
  }
  function FLOW() {
    if (state1 == "true" && state2 == "true") {
      document.getElementById("bashFLOW").textContent = "";
      document.getElementById("wireFLOW").textContent = "";
    } else if (state1 == "false" && state2 == "true") {
      document.getElementById("bashFLOW").textContent = " -Q out";
      document.getElementById("wireFLOW").textContent = " -Q out";
    } else if (state1 == "true" && state2 == "false") {
      document.getElementById("bashFLOW").textContent = " -Q in";
      document.getElementById("wireFLOW").textContent = " -Q in";
    }
  }
  const [state1, setState1] = useState(() => {
    return localStorage.getItem(filename[0]) || defaultValue;
  });
  const [state2, setState2] = useState(() => {
    return localStorage.getItem(filename[1]) || defaultValue;
  });
  useEffect(() => {
    if (state1 === "true") {
      document.getElementById(flagOption[0]).checked = true;
    } else {
      document.getElementById(flagOption[0]).checked = false;
    }
    if (state2 === "true") {
      document.getElementById(flagOption[1]).checked = true;
    } else {
      document.getElementById(flagOption[1]).checked = false;
      if (disableCondition) {
        setState1("false");
      }
    }
    if (!disableCondition) {
      if (document.getElementById(flagOption[0]).checked == false) {
        document.getElementById(flagOption[1]).disabled = true;
        document.getElementById(flagOption[1]).checked = true;
        setState2("true");
      } else {
        document.getElementById(flagOption[1]).disabled = false;
      }
    }
    if (flagLogic == "HOSTandSERVICE") {
      HOSTandSERVICE();
    } else if (flagLogic == "FLOW") {
      FLOW();
    }
    localStorage.setItem(filename[0], state1);
    localStorage.setItem(filename[1], state2);
  }, [state1, state2]);
  return (
    <>
      <div className="container option">
        <div className="row ">
          <p>{title}</p>
          <div className="col">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="host"
                id={flagOption[0]}
                disabled={disableCondition && !("true" === state2)}
                onChange={(e) => setState1(e.target.checked.toString())}
              />
              <label className="form-check-label" htmlFor={flagOption[0]}>
                {flagOption[0]}
              </label>
            </div>
          </div>
          <div className="col">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="service"
                id={flagOption[1]}
                onChange={(e) => setState2(e.target.checked.toString())}
              />
              <label className="form-check-label" htmlFor={flagOption[1]}>
                {flagOption[1]}
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
