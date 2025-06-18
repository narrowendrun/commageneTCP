import { useState, useEffect } from "react";
import { macLogic } from "../macLogic";

export default function MACForm({ setFilters, index }) {
  const [andor, setAndor] = useState("or");
  const [MACs, setMACs] = useState({ srcMAC: "", dstMAC: "" });
  const [formData, setFormData] = useState({
    srcMAC: "",
    dstMAC: "",
  });

  const [errors, setErrors] = useState({
    srcMAC: "",
    dstMAC: "",
  });

  const handleFieldChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    if (value.trim() === "") {
      // If input is blank, reset MAC and errors
      setMACs((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
      return; // Skip further logic
    }

    const macOutput = macLogic("outermac", value);
    const newMACValue =
      fieldName === "srcMAC"
        ? `ether src ${macOutput}`
        : `ether dst ${macOutput}`;

    setMACs((prev) => ({
      ...prev,
      [fieldName]: newMACValue,
    }));

    if (macOutput === "invalid mac") {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "Invalid MAC address",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
    }
  };

  useEffect(() => {
    setFilters((prevFilters) => {
      let newFilters = { ...prevFilters };
      if (MACs.srcMAC.trim() !== "" && MACs.dstMAC.trim() !== "") {
        newFilters[index].filter = `'(${MACs.srcMAC} ${andor} ${MACs.dstMAC})'`;
      } else if (MACs.srcMAC.trim() !== "" && MACs.dstMAC.trim() == "") {
        newFilters[index].filter = `${MACs.srcMAC}`;
      } else if (MACs.srcMAC.trim() == "" && MACs.dstMAC.trim() !== "") {
        newFilters[index].filter = `${MACs.dstMAC}`;
      } else {
        newFilters[index].filter = `ether mac`;
      }
      return newFilters;
    });
  }, [MACs, andor]);

  return (
    <div className="filtereditform">
      <div className="row">
        <div className="col">
          <label htmlFor="srcMAC_input" className="form-label">
            Inner Src MAC
          </label>
          <input
            id="srcMAC_input"
            type="text"
            className={`form-control ${errors.srcMAC ? "is-invalid" : ""}`}
            value={formData.srcMAC}
            onChange={(e) => handleFieldChange("srcMAC", e.target.value)}
            placeholder="00:00:00:00:00:00"
            style={{ borderRadius: "0" }}
          />
          {errors.srcMAC && (
            <div className="invalid-feedback">{errors.srcMAC}</div>
          )}
        </div>
        <div className="col-1 filterFormSwitcherButton">
          <button
            onClick={() =>
              setAndor((prev) => {
                if (prev == "or") return "and";
                return "or";
              })
            }
          >
            {andor}
          </button>
        </div>

        <div className="col">
          <label htmlFor="dstMAC_input" className="form-label">
            Inner Dst MAC
          </label>
          <input
            id="dstMAC_input"
            type="text"
            className={`form-control ${errors.dstMAC ? "is-invalid" : ""}`}
            value={formData.dstMAC}
            onChange={(e) => handleFieldChange("dstMAC", e.target.value)}
            placeholder="00:00:00:00:00:00"
            style={{ borderRadius: "0" }}
          />
          {errors.dstMAC && (
            <div className="invalid-feedback">{errors.dstMAC}</div>
          )}
        </div>
      </div>
    </div>
  );
}
