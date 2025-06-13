import { useState, useEffect } from "react";

export default function CheckBox({
  title,
  flagOption,
  filename,
  disableCondition,
  defaultValue = false,
  flagLogic,
  setOptionsFlags,
}) {
  const [isChecked1, setIsChecked1] = useState(() => {
    const saved = localStorage.getItem(filename[0]);
    return saved === null ? defaultValue : saved === "true";
  });

  const [isChecked2, setIsChecked2] = useState(() => {
    const saved = localStorage.getItem(filename[1]);
    return saved === null ? defaultValue : saved === "true";
  });

  const calculateFlags = () => {
    if (flagLogic === "hostService") {
      if (isChecked1 && isChecked2) return "";
      if (!isChecked1 && isChecked2) return "n";
      if (!isChecked1 && !isChecked2) return "nn";
    } else if (flagLogic === "flowDirection") {
      if (isChecked1 && isChecked2) return "";
      if (!isChecked1 && isChecked2) return " -Q out";
      if (isChecked1 && !isChecked2) return " -Q in";
    }
    return "";
  };

  const getActualStates = () => {
    let actualChecked1 = isChecked1;
    let actualChecked2 = isChecked2;
    let isDisabled1 = disableCondition && !isChecked2;
    let isDisabled2 = false;

    if (!disableCondition) {
      if (!isChecked1) {
        isDisabled2 = true;
        actualChecked2 = true;
      }
    }

    return { actualChecked1, actualChecked2, isDisabled1, isDisabled2 };
  };

  const { actualChecked1, actualChecked2, isDisabled1, isDisabled2 } = getActualStates();

  useEffect(() => {
    localStorage.setItem(filename[0], isChecked1.toString());
    localStorage.setItem(filename[1], isChecked2.toString());

    const flagValue = calculateFlags();
    setOptionsFlags((prev) => ({
      ...prev,
      [flagLogic]: flagValue,
    }));
  }, [isChecked1, isChecked2]);

  const handleCheck1Change = (e) => {
    setIsChecked1(e.target.checked);
  };

  const handleCheck2Change = (e) => {
    const newChecked2 = e.target.checked;
    setIsChecked2(newChecked2);
    if (disableCondition && !newChecked2) {
      setIsChecked1(false);
    }
  };

  return (
    <div className="container option">
      <div className="row">
        <p>{title}</p>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="host"
              id={flagOption[0]}
              checked={actualChecked1}
              disabled={isDisabled1}
              onChange={handleCheck1Change}
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
              checked={actualChecked2}
              disabled={isDisabled2}
              onChange={handleCheck2Change}
            />
            <label className="form-check-label" htmlFor={flagOption[1]}>
              {flagOption[1]}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
