import { useState } from "react";

export default function PortForm({ setFilters, index, protocol }) {
  const [formData, setFormData] = useState({
    srcPort: "",
    dstPort: "",
  });

  const [errors, setErrors] = useState({
    srcPort: "",
    dstPort: "",
  });

  const [ports, setPorts] = useState({
    srcPort: "",
    dstPort: "",
  });

  const [andor, setAndor] = useState("or");

  const updateFilter = (newPorts, currentAndor) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      if (!newFilters[index]) {
        newFilters[index] = {};
      }

      const src = newPorts.srcPort.trim();
      const dst = newPorts.dstPort.trim();

      if (src && dst) {
        newFilters[
          index
        ].filter = `'(src port ${src} ${currentAndor} dst port ${dst})'`;
      } else if (src) {
        newFilters[index].filter = `src port ${src}`;
      } else if (dst) {
        newFilters[index].filter = `dst port ${dst}`;
      } else {
        newFilters[index].filter = `${protocol}`;
      }

      return newFilters;
    });
  };

  const handleAndOrToggle = () => {
    const newAndor = andor === "or" ? "and" : "or";
    setAndor(newAndor);
    updateFilter(ports, newAndor);
  };

  const handleFieldChange = (fieldName, value) => {
    const trimmedValue = value.trim();

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    // Update ports state
    const newPorts = {
      ...ports,
      [fieldName]: trimmedValue,
    };
    setPorts(newPorts);

    // Clear validation errors
    setErrors((prev) => ({
      ...prev,
      [fieldName]: "",
    }));

    // Update the filter
    updateFilter(newPorts, andor);
  };

  return (
    <div className="filtereditform">
      <div className="row">
        <div className="col">
          <label htmlFor="srcPort" className="form-label">
            src Port
          </label>
          <input
            id="srcPort"
            type="text"
            className={`form-control ${errors.srcPort ? "is-invalid" : ""}`}
            value={formData.srcPort}
            onChange={(e) => handleFieldChange("srcPort", e.target.value)}
            placeholder="420"
            style={{ borderRadius: "0" }}
          />
          {errors.srcPort && (
            <div className="invalid-feedback">{errors.srcPort}</div>
          )}
        </div>

        <div className="col-1 filterFormSwitcherButton">
          <button onClick={handleAndOrToggle}>{andor}</button>
        </div>

        <div className="col">
          <label htmlFor="dstPort" className="form-label">
            dst Port
          </label>
          <input
            id="dstPort"
            type="text"
            className={`form-control ${errors.dstPort ? "is-invalid" : ""}`}
            value={formData.dstPort}
            onChange={(e) => handleFieldChange("dstPort", e.target.value)}
            placeholder="69"
            style={{ borderRadius: "0" }}
          />
          {errors.dstPort && (
            <div className="invalid-feedback">{errors.dstPort}</div>
          )}
        </div>
      </div>
    </div>
  );
}
