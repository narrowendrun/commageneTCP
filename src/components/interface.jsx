import { useState } from "react";
import imgUrl from "../images/mentat.png";

export default function Interface({setOptionsFlags}){
    const [state, setState] = useState('')
    return <>
     <div className="container section">
        <div className="row align-items-end" style={{marginLeft:"2%"}}>
          <div className="col-10">
            <label htmlFor="interface_input">
              <h2>Interface?</h2>
            </label>
            <input
              id="interface_input"
              type="text"
              className="form-control"
              placeholder="leave blank for 'any' interface"
              value={state}
              onChange={(e) => {
                  setState(e.target.value)
                  setOptionsFlags((prevFlags) => {
                    let newFlags = { ...prevFlags };
                    const input = e.target.value.trim(); // Removes all leading/trailing spaces
                    newFlags.interface = input ? `i ${input}` : "i any";
                    return newFlags;
                  });
                }
              }
              autoComplete="off"
            />
          </div>
          <div className="col-2">
            <img
              id="logo1"
              src={imgUrl}
              alt="a mentat signifying the calculations the tool does to give the ouput"
            />
          </div>
        </div>
      </div>
    </>
}