import { useState } from "react";

export default function IPform({ setFilters, index, currentFilter }) {
  // Parse existing filter to extract previous values
  const parseExistingFilter = (filterString) => {
    if (!filterString || filterString === "ip") {
      return {
        srcIP: "",
        dstIP: "",
        andor: "or",
      };
    }

    const parsed = {
      srcIP: "",
      dstIP: "",
      andor: "or",
    };

    // Extract src IP
    const srcIpMatch = filterString.match(/src host ([\d.]+)/);
    if (srcIpMatch) {
      parsed.srcIP = srcIpMatch[1];
    }

    // Extract dst IP
    const dstIpMatch = filterString.match(/dst host ([\d.]+)/);
    if (dstIpMatch) {
      parsed.dstIP = dstIpMatch[1];
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

  // Initialize IPs based on parsed values
  const [IPs, setIPs] = useState(() => {
    const initialIPs = { srcIP: "", dstIP: "" };

    if (initialValues.srcIP) {
      initialIPs.srcIP = `src host ${initialValues.srcIP}`;
    }
    if (initialValues.dstIP) {
      initialIPs.dstIP = `dst host ${initialValues.dstIP}`;
    }

    return initialIPs;
  });

  const [formData, setFormData] = useState({
    srcIP: initialValues.srcIP,
    dstIP: initialValues.dstIP,
  });

  const [errors, setErrors] = useState({
    srcIP: "",
    dstIP: "",
  });

  const validateIP = (ip) => {
    const ipRegex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip) ? ip : "invalid ip";
  };

  // Update filter function
  const updateFilter = (newIPs, currentAndor) => {
    setFilters((prevFilters) => {
      let newFilters = { ...prevFilters };
      if (newIPs.srcIP.trim() !== "" && newIPs.dstIP.trim() !== "") {
        newFilters[
          index
        ].filter = `'(${newIPs.srcIP} ${currentAndor} ${newIPs.dstIP})'`;
      } else if (newIPs.srcIP.trim() !== "" && newIPs.dstIP.trim() === "") {
        newFilters[index].filter = `${newIPs.srcIP}`;
      } else if (newIPs.srcIP.trim() === "" && newIPs.dstIP.trim() !== "") {
        newFilters[index].filter = `${newIPs.dstIP}`;
      } else {
        newFilters[index].filter = `ip`;
      }
      return newFilters;
    });
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    let newIPs = { ...IPs };

    if (value.trim() === "") {
      // If input is blank, reset IP and errors
      newIPs[fieldName] = "";
      setIPs(newIPs);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "",
      }));

      // Update filter with empty value
      updateFilter(newIPs, andor);
      return;
    }

    const ipOutput = validateIP(value);
    const newIPValue =
      fieldName === "srcIP" ? `src host ${ipOutput}` : `dst host ${ipOutput}`;

    if (ipOutput === "invalid ip") {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "Invalid IP address",
      }));
      // Don't update IPs or filter for invalid input
      return;
    } else {
      newIPs[fieldName] = newIPValue;
      setIPs(newIPs);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "",
      }));

      // Update filter with new IP value
      updateFilter(newIPs, andor);
    }
  };

  const handleAndOrToggle = () => {
    const newAndor = andor === "or" ? "and" : "or";
    setAndor(newAndor);

    // Update filter with new and/or value
    updateFilter(IPs, newAndor);
  };

  return (
    <div className="filtereditform">
      <div className="row">
        <div className="col">
          <label htmlFor="srcIP_input" className="form-label">
            src IP
          </label>
          <input
            id="srcIP_input"
            type="text"
            className={`form-control ${errors.srcIP ? "is-invalid" : ""}`}
            value={formData.srcIP}
            onChange={(e) => handleFieldChange("srcIP", e.target.value)}
            placeholder="1.1.1.1"
            style={{ borderRadius: "0" }}
          />
          {errors.srcIP && (
            <div className="invalid-feedback">{errors.srcIP}</div>
          )}
        </div>
        <div className="col-1 filterFormSwitcherButton">
          <button onClick={handleAndOrToggle}>{andor}</button>
        </div>

        <div className="col">
          <label htmlFor="dstIP_input" className="form-label">
            dst IP
          </label>
          <input
            id="dstIP_input"
            type="text"
            className={`form-control ${errors.dstIP ? "is-invalid" : ""}`}
            value={formData.dstIP}
            onChange={(e) => handleFieldChange("dstIP", e.target.value)}
            placeholder="2.2.2.2"
            style={{ borderRadius: "0" }}
          />
          {errors.dstIP && (
            <div className="invalid-feedback">{errors.dstIP}</div>
          )}
        </div>
      </div>
    </div>
  );
}
