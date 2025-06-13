import { useEffect, useState } from "react";

export default function VerboseSlider({setOptionsFlags}) {
  const [verboseLevel, setVerboseLevel] = useState(() => 
    parseInt(localStorage.getItem("tcp_verbosity") ?? "0")
  );

  const verboseOptions = [
    { id: 0, text: "no", option: "" },
    { id: 1, text: "very", option: "v" },
    { id: 2, text: "vvery", option: "vv" },
    { id: 3, text: "vvvery", option: "vvv" }
  ];

  const currentVerbose = verboseOptions[verboseLevel] || verboseOptions[3];

  useEffect(() => {
    localStorage.setItem("tcp_verbosity", verboseLevel.toString());
    setOptionsFlags((prevFlags) => {
      const selectedOption = verboseOptions.find(opt => opt.id === verboseLevel)?.option || "";
      return {
        ...prevFlags,
        verbosity: selectedOption
      };
    });
  }, [verboseLevel]);

  return (
    <div className="container option">
      <label htmlFor="verbose_slider" className="form-label">
        How do you like your verbosity?
      </label>
      <div className="row">
        <div className="col-md-9">
          <input
            type="range"
            className="form-range"
            id="verbose_slider"
            min="0"
            max="3"
            step="1"
            value={verboseLevel}
            onChange={(e) => {
                const newLevel=parseInt(e.target.value)
                setVerboseLevel(newLevel) 
              }
            }
          />
        </div>
        <div className="col-md-3">
          <p
            style={{
              background: "blue",
              borderRadius: "10px",
              textAlign: "center",
              padding: "1% 0",
            }}
          >
            {currentVerbose.text}
          </p>
        </div>
      </div>
    </div>
  );
}