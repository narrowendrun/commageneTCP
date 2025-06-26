import { useState } from "react";

function expandIPv6Address(address) {
  const sections = address.split("::");

  if (sections.length > 2) return "invalid ip6";

  const head = sections[0] ? sections[0].split(":") : [];
  const tail = sections[1] ? sections[1].split(":") : [];

  const missingCount = 8 - (head.length + tail.length);
  if (missingCount < 0) return "invalid ip6";

  const fullParts = [...head, ...Array(missingCount).fill("0"), ...tail];

  if (fullParts.length !== 8) return "invalid ip6";

  for (const part of fullParts) {
    if (!/^[0-9a-fA-F]{1,4}$/.test(part)) return "invalid ip6";
  }

  return fullParts.map((p) => p.padStart(4, "0").toLowerCase()).join(":");
}

export default function IP6form({ setFilters, index, currentFilter }) {
  const parseExistingFilter = (filterString) => {
    if (!filterString || filterString === "ip6") {
      return { srcIP6: "", dstIP6: "", andor: "or" };
    }

    const parsed = { srcIP6: "", dstIP6: "", andor: "or" };

    const srcMatch = filterString.match(/src host ([\w:]+)/);
    if (srcMatch) parsed.srcIP6 = srcMatch[1];

    const dstMatch = filterString.match(/dst host ([\w:]+)/);
    if (dstMatch) parsed.dstIP6 = dstMatch[1];

    if (filterString.includes(" and ")) parsed.andor = "and";
    else if (filterString.includes(" or ")) parsed.andor = "or";

    return parsed;
  };

  const initialValues = parseExistingFilter(currentFilter?.filter);
  const [andor, setAndor] = useState(initialValues.andor);
  const [formData, setFormData] = useState({
    srcIP6: initialValues.srcIP6,
    dstIP6: initialValues.dstIP6,
  });
  const [IPs, setIPs] = useState(() => {
    const initialIPs = {};
    if (initialValues.srcIP6) {
      initialIPs.srcIP6 = `src host ${initialValues.srcIP6}`;
    }
    if (initialValues.dstIP6) {
      initialIPs.dstIP6 = `dst host ${initialValues.dstIP6}`;
    }
    return initialIPs;
  });

  const [errors, setErrors] = useState({
    srcIP6: "",
    dstIP6: "",
  });

  const validateIP = (ip) => {
    const expanded = expandIPv6Address(ip.trim());
    return expanded === "invalid ip6" ? "invalid ip6" : expanded;
  };

  const updateFilter = (newIPs, currentAndor) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (newIPs.srcIP6 && newIPs.dstIP6) {
        newFilters[
          index
        ].filter = `'(${newIPs.srcIP6} ${currentAndor} ${newIPs.dstIP6})'`;
      } else if (newIPs.srcIP6) {
        newFilters[index].filter = `${newIPs.srcIP6}`;
      } else if (newIPs.dstIP6) {
        newFilters[index].filter = `${newIPs.dstIP6}`;
      } else {
        newFilters[index].filter = `ip6`;
      }
      return newFilters;
    });
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    const newIPs = { ...IPs };

    if (value.trim() === "") {
      newIPs[field] = "";
      setIPs(newIPs);
      setErrors((prev) => ({ ...prev, [field]: "" }));
      updateFilter(newIPs, andor);
      return;
    }

    const result = validateIP(value);
    const fullField =
      field === "srcIP6" ? `src host ${result}` : `dst host ${result}`;

    if (result === "invalid ip6") {
      setErrors((prev) => ({ ...prev, [field]: "Invalid IPv6 address" }));
      return;
    } else {
      newIPs[field] = fullField;
      setIPs(newIPs);
      setErrors((prev) => ({ ...prev, [field]: "" }));
      updateFilter(newIPs, andor);
    }
  };

  const handleAndOrToggle = () => {
    const newVal = andor === "or" ? "and" : "or";
    setAndor(newVal);
    updateFilter(IPs, newVal);
  };

  return (
    <div className="filtereditform">
      <div className="row">
        <div className="col">
          <label htmlFor="srcIP6_input" className="form-label">
            src IPv6
          </label>
          <input
            id="srcIP6_input"
            type="text"
            className={`form-control ${errors.srcIP6 ? "is-invalid" : ""}`}
            value={formData.srcIP6}
            onChange={(e) => handleFieldChange("srcIP6", e.target.value)}
            placeholder="2001:db8::1"
            style={{ borderRadius: "0" }}
          />
          {errors.srcIP6 && (
            <div className="invalid-feedback">{errors.srcIP6}</div>
          )}
        </div>

        <div className="col-1 filterFormSwitcherButton">
          <button onClick={handleAndOrToggle}>{andor}</button>
        </div>

        <div className="col">
          <label htmlFor="dstIP6_input" className="form-label">
            dst IPv6
          </label>
          <input
            id="dstIP6_input"
            type="text"
            className={`form-control ${errors.dstIP6 ? "is-invalid" : ""}`}
            value={formData.dstIP6}
            onChange={(e) => handleFieldChange("dstIP6", e.target.value)}
            placeholder="2001:db8::2"
            style={{ borderRadius: "0" }}
          />
          {errors.dstIP6 && (
            <div className="invalid-feedback">{errors.dstIP6}</div>
          )}
        </div>
      </div>
    </div>
  );
}
