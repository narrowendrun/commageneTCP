import { useState, useEffect } from "react";

export default function PacketCount({ setOptionsFlags }) {
  const [value, setValue] = useState(
    () => localStorage.getItem("tcp_packetCount") || ""
  );

  const [error, setError] = useState("");

  const isValidInteger = (input) => {
    if (input === "") return true;
    const num = parseInt(input, 10);
    return !isNaN(num) && num > 0 && num.toString() === input;
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue === "" || /^\d+$/.test(inputValue)) {
      setValue(inputValue);
      setError("");
    } else {
      setError("Enter only positive integers");
    }
  };

  useEffect(() => {
    localStorage.setItem("packet_count", value);
    if (isValidInteger(value)) {
      const flagValue = value ? ` -c ${value}` : "";
      setOptionsFlags((prevFlags) => {
        let newFlags = { ...prevFlags };
        newFlags.packetCount = flagValue;
        return newFlags;
      });
    }
  }, [value]);

  return (
    <div className="container option">
      <label htmlFor="packet_input">
        Packet count?
        {error && (
          <span style={{ color: "white", marginLeft: "0.5em" }}>({error})</span>
        )}
      </label>
      <input
        id="packet_input"
        type="text"
        className={`form-control ${error ? "is-invalid" : ""}`}
        placeholder="leave blank for no limit"
        value={value}
        onChange={handleInputChange}
        autoComplete="off"
        inputMode="numeric"
        pattern="[0-9]*"
      />
    </div>
  );
}
