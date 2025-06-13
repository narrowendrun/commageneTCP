import { useEffect, useState } from "react";

export default function Timestamp({ setOptionsFlags }) {
  const timestampOptions = [
    { id: "TimeStampRadio1", value: "", label: "Print time normally" },
    { id: "TimeStampRadio2", value: "t", label: "Do not print time at all" },
    { id: "TimeStampRadio3", value: "tt", label: "Linux time" },
    { id: "TimeStampRadio4", value: "ttt", label: "Delta since the previous packet" },
    { id: "TimeStampRadio5", value: "tttt", label: "Time with the calendar date" },
    { id: "TimeStampRadio6", value: "ttttt", label: "Delta since the start of the command" }
  ];

  const [selectedTime, setSelectedTime] = useState(() => 
    localStorage.getItem("tcp_timestamp") ?? "TimeStampRadio1"
  );

  // Update localStorage and optionsFlags when selection changes
  useEffect(() => {
    localStorage.setItem("tcp_timestamp", selectedTime);

    const selectedValue = timestampOptions.find(opt => opt.id === selectedTime)?.value ?? "";
    setOptionsFlags(prev => ({
      ...prev,
      timestamp: selectedValue
    }));
  }, [selectedTime]);

  return (
    <div className="container option">
      <p>Timestamp preference?</p>
      <div className="row">
        {[0, 3].map((startIdx) => (
          <div className="col" key={startIdx}>
            {timestampOptions.slice(startIdx, startIdx + 3).map(({ id, label }) => (
              <div key={id} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="TimeStampRadios"
                  id={id}
                  checked={selectedTime === id}
                  onChange={() => setSelectedTime(id)}
                />
                <label className="form-check-label" htmlFor={id}>
                  {label}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
