import { useState } from "react";

export default function VlanForm({ setFilters, index }) {
  const [vlan, setVlan] = useState("");

  function formatVlan(value) {
    const elements = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    const vlanElements = elements.map((item) => `vlan ${item}`);

    if (vlanElements.length > 1) {
      return `'(${vlanElements.join(" or ")})'`;
    } else if (vlanElements.length === 1) {
      return vlanElements[0];
    } else {
      return "vlan";
    }
  }
  const setOptionsFlag = (value) => {
    let output = formatVlan(value);
    setFilters((prevFilters) => {
      let newFilters = { ...prevFilters };
      newFilters[index].filter = output;
      return newFilters;
    });
  };

  const handleFieldChange = (value) => {
    setVlan(value);
    setOptionsFlag(value);
  };

  return (
    <>
      <div className="filtereditform">
        <div className="row">
          <div className="col">
            <label htmlFor="vlan_input" className="form-label">
              VLAN(s)
            </label>
            <input
              id="vlan_input"
              type="text"
              className={`form-control`}
              value={vlan}
              onChange={(e) => handleFieldChange(e.target.value)}
              placeholder="10,20"
              style={{ borderRadius: "0" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
