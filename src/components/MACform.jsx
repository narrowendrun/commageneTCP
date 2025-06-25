import { useState } from "react";
import { macLogic } from "../macLogic";

export default function MACForm({ setFilters, index, currentFilter }) {
  // Parse existing filter to extract previous values
  const parseExistingFilter = (filterString) => {
    if (!filterString || filterString === "ether mac") {
      return {
        srcMAC: "",
        dstMAC: "",
        andor: "or",
      };
    }

    const parsed = {
      srcMAC: "",
      dstMAC: "",
      andor: "or",
    };

    // Extract src MAC
    const srcMacMatch = filterString.match(/ether src ([a-fA-F0-9:]{17})/);
    if (srcMacMatch) {
      parsed.srcMAC = srcMacMatch[1];
    }

    // Extract dst MAC
    const dstMacMatch = filterString.match(/ether dst ([a-fA-F0-9:]{17})/);
    if (dstMacMatch) {
      parsed.dstMAC = dstMacMatch[1];
    }

    // Extract and/or operator
    if (filterString.includes(" and ")) {
      parsed.andor = "and";
    } else if (filterString.includes(" or ")) {
      parsed.andor = "or";
    }

    return parsed;
  };

  const initialValues = parseExistingFilter(currentFilter?.filter);

  const [andor, setAndor] = useState(initialValues.andor);

  // Initialize MACs based on parsed values
  const [MACs, setMACs] = useState(() => {
    const initialMACs = { srcMAC: "", dstMAC: "" };

    if (initialValues.srcMAC) {
      initialMACs.srcMAC = `ether src ${initialValues.srcMAC}`;
    }
    if (initialValues.dstMAC) {
      initialMACs.dstMAC = `ether dst ${initialValues.dstMAC}`;
    }

    return initialMACs;
  });

  const [formData, setFormData] = useState({
    srcMAC: initialValues.srcMAC,
    dstMAC: initialValues.dstMAC,
  });

  const [errors, setErrors] = useState({
    srcMAC: "",
    dstMAC: "",
  });

  // Update filter function
  const updateFilter = (newMACs, currentAndor) => {
    setFilters((prevFilters) => {
      let newFilters = { ...prevFilters };
      if (newMACs.srcMAC.trim() !== "" && newMACs.dstMAC.trim() !== "") {
        newFilters[
          index
        ].filter = `'(${newMACs.srcMAC} ${currentAndor} ${newMACs.dstMAC})'`;
      } else if (newMACs.srcMAC.trim() !== "" && newMACs.dstMAC.trim() === "") {
        newFilters[index].filter = `${newMACs.srcMAC}`;
      } else if (newMACs.srcMAC.trim() === "" && newMACs.dstMAC.trim() !== "") {
        newFilters[index].filter = `${newMACs.dstMAC}`;
      } else {
        newFilters[index].filter = `ether mac`;
      }
      return newFilters;
    });
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    let newMACs = { ...MACs };

    if (value.trim() === "") {
      // If input is blank, reset MAC and errors
      newMACs[fieldName] = "";
      setMACs(newMACs);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "",
      }));

      // Update filter with empty value
      updateFilter(newMACs, andor);
      return;
    }

    const macOutput = macLogic("outermac", value);
    const newMACValue =
      fieldName === "srcMAC"
        ? `ether src ${macOutput}`
        : `ether dst ${macOutput}`;

    if (macOutput === "invalid mac") {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "Invalid MAC address",
      }));
      // Don't update MACs or filter for invalid input
      return;
    } else {
      newMACs[fieldName] = newMACValue;
      setMACs(newMACs);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "",
      }));

      // Update filter with new MAC value
      updateFilter(newMACs, andor);
    }
  };

  const handleAndOrToggle = () => {
    const newAndor = andor === "or" ? "and" : "or";
    setAndor(newAndor);
    // setFilters((prevFilters) => {
    //   let newFilters = { ...prevFilters };
    //   newFilters[index].andorVal = newAndor;
    //   return newFilters;
    // });
    // Update filter with new and/or value
    updateFilter(MACs, newAndor);
  };

  return (
    <div className="filtereditform">
      <div className="row">
        <div className="col">
          <label htmlFor="srcMAC_input" className="form-label">
            src MAC
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
          <button onClick={handleAndOrToggle}>{andor}</button>
        </div>

        <div className="col">
          <label htmlFor="dstMAC_input" className="form-label">
            dst MAC
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
