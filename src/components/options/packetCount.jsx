import { useState, useEffect } from "react";

export default function PacketCount() {
  const [state, setState] = useState("");
  useEffect(() => {
    if (!isNaN(state) && !state.includes(" ") && !state.includes(".")) {
      if (state !== "") {
        document.getElementById("errorMSG").style.display = "none";
        document.getElementById("bashCOUNT").textContent = " -c " + state;
      } else {
        document.getElementById("bashCOUNT").textContent = "";
      }
    } else {
      document.getElementById("errorMSG").style.display = "inline";
      document.getElementById("bashCOUNT").textContent = "";
    }
  }, [state]);
  return (
    <>
      <div className="container option">
        <label htmlFor="count_input">
          Packet count?
          <span id="errorMSG" style={{ display: "none" }}>
            &ensp; (enter only integers)
          </span>
        </label>
        <input
          id="count_input"
          type="text"
          className="form-control"
          placeholder="leave blank for no limit"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>
    </>
  );
}
