import { useState, useEffect } from "react";

export default function SwitchButton({ option, filename, flag, title, setOptionsFlags }) {
  const [isChecked, setIsChecked] = useState(() => 
    localStorage.getItem(filename) === "true"
  );

  useEffect(() => {
    localStorage.setItem(filename, isChecked.toString());
      setOptionsFlags((prevFlags)=>{
        let newFlags = {...prevFlags}
        newFlags[option]=`${isChecked ? flag : ""}`
        return newFlags
      })
  }, [isChecked]);

  return (
    <div className="form-check form-switch option">
      <br />
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id={option}
        style={{ margin: "1% 2% 0 0" }}
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <label className="form-check-label" htmlFor={option}>
        {title}
      </label>
    </div>
  );
}