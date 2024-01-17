import { useEffect } from "react";
import { useState } from "react";
import imgUrl from "../images/mentat.png";

export default function Interface() {
  const [state, setState] = useState("");
  useEffect(() => {
    if (state == "") {
      document.getElementById("bashINT").textContent = "i any ";
      document.getElementById("wireINT").textContent = " -i any";
    } else {
      document.getElementById("bashINT").textContent = `i ${state} `;
      document.getElementById("wireINT").textContent = " -i " + state;
    }
  }, [state]);

  return (
    <>
      <div className="container">
        <div className="row align-items-end">
          <div className="col-md-10">
            <label htmlFor="packet_input">
              <h2>Interface?</h2>
            </label>
            <input
              id="packet_input"
              type="text"
              className="form-control"
              placeholder="leave blank for 'any' interface"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <img
              id="logo1"
              src={imgUrl}
              alt="a mentat signifying the calculations the tool does to give the ouput"
            />
          </div>
        </div>
      </div>
    </>
  );
}
