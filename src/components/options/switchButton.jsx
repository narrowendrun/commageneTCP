import { useState, useEffect } from "react";

export default function SwitchButton({ option, filename, flag, span, title }) {
  const [state, setState] = useState(localStorage.getItem(filename));
  useEffect(() => {
    if (state == "true") {
      document.getElementById(option).checked = true;
      document.getElementById(span).textContent = flag;
    } else {
      document.getElementById(option).checked = false;
      document.getElementById(span).textContent = "";
    }
    localStorage.setItem(filename, state);
  }, [state]);

  return (
    <>
      <div className="form-check form-switch option">
        <br />
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id={option}
          style={{ margin: "1% 2% 0 0" }}
          onChange={(e) => setState(e.target.checked.toString())}
        />
        <label className="form-check-label" htmlFor={option}>
          {title}
        </label>
      </div>
    </>
  );
}
