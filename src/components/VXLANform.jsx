import { useState } from "react";
import { macLogic } from "../macLogic";
export default function VxlanForm({ setFilters, index }) {
  const [formData, setFormData] = useState({
    innerSrcMAC: "",
    innerDstMAC: "",
    innerSrcIP: "",
    innerDstIP: "",
    VNI: "",
  });

  const [errors, setErrors] = useState({});

  const validateIP = (ip) => {
    const ipRegex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip) || ip === "" ? "" : "Invalid IP address format";
  };

  const validateVNI = (vni) => {
    const vniNum = parseInt(vni);
    if (vni === "") return "";
    if (isNaN(vniNum) || vniNum < 0 || vniNum > 16777215) {
      return "VNI must be between 0 and 16777215";
    }
    return "";
  };

  const setOptionsFlag = (newFormData) => {
    let output = "port 4789 and udp[8:2] = 0x0800";
    output += Object.values(newFormData).join(" ");
    console.log(output);
  };

  const handleFieldChange = (fieldName, value) => {
    let error = "";
    let macFilter = "";

    switch (fieldName) {
      case "innerSrcMAC":
      case "innerDstMAC":
        macFilter = macLogic(fieldName, value);
        error =
          macFilter === "invalid mac" || macFilter === "invalid MAC address"
            ? "invalid mac"
            : "";
        break;
      case "innerSrcIP":
      case "innerDstIP":
        error = validateIP(value);
        break;
      case "VNI":
        error = validateVNI(value);
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
    const newFormData = {
      ...formData,
      [fieldName]: value,
    };

    setFormData(newFormData);

    // 👑 Log values when any field changes
    console.log("innerSrcMAC:", macFilter);
    console.log("innerDstMAC:", newFormData.innerDstMAC);
    console.log("innerSrcIP:", newFormData.innerSrcIP);
    console.log("innerDstIP:", newFormData.innerDstIP);
    console.log("VNI:", newFormData.VNI);

    setOptionsFlag(newFormData);
  };

  return (
    <>
      <div className="filtereditform">
        <div className="row">
          <div className="col">
            <label htmlFor="innerSrcMAC_input" className="form-label">
              inner src MAC
            </label>
            <input
              id="innerSrcMAC_input"
              type="text"
              className={`form-control ${
                errors.innerSrcMAC ? "is-invalid" : ""
              }`}
              value={formData.innerSrcMAC}
              onChange={(e) => handleFieldChange("innerSrcMAC", e.target.value)}
              placeholder="00:00:00:00:00:00"
              style={{ borderRadius: "0" }}
            />
            {errors.innerSrcMAC && (
              <div className="invalid-feedback">{errors.innerSrcMAC}</div>
            )}
          </div>

          <div className="col">
            <label htmlFor="innderDstMAC_input" className="form-label">
              inner dst MAC
            </label>
            <input
              id="innderDstMAC_input"
              type="text"
              className={`form-control ${
                errors.innerDstMAC ? "is-invalid" : ""
              }`}
              value={formData.innerDstMAC}
              onChange={(e) => handleFieldChange("innerDstMAC", e.target.value)}
              placeholder="00:00:00:00:00:00"
              style={{ borderRadius: "0" }}
            />
            {errors.innerDstMAC && (
              <div className="invalid-feedback">{errors.innerDstMAC}</div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="innerSrcIP_input" className="form-label">
              inner src IP
            </label>
            <input
              id="innerSrcIP_input"
              type="text"
              className={`form-control ${
                errors.innerSrcIP ? "is-invalid" : ""
              }`}
              value={formData.innerSrcIP}
              onChange={(e) => handleFieldChange("innerSrcIP", e.target.value)}
              placeholder="192.168.1.1"
              style={{ borderRadius: "0" }}
            />
            {errors.innerSrcIP && (
              <div className="invalid-feedback">{errors.innerSrcIP}</div>
            )}
          </div>

          <div className="col">
            <label htmlFor="innerDstIP_input" className="form-label">
              inner dst IP
            </label>
            <input
              id="innerDstIP_input"
              type="text"
              className={`form-control ${
                errors.innerDstIP ? "is-invalid" : ""
              }`}
              value={formData.innerDstIP}
              onChange={(e) => handleFieldChange("innerDstIP", e.target.value)}
              placeholder="192.168.1.2"
              style={{ borderRadius: "0" }}
            />
            {errors.innerDstIP && (
              <div className="invalid-feedback">{errors.innerDstIP}</div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="vni_input" className="form-label">
              VNI
            </label>
            <input
              id="vni_input"
              type="text"
              className={`form-control ${errors.VNI ? "is-invalid" : ""}`}
              value={formData.VNI}
              onChange={(e) => handleFieldChange("VNI", e.target.value)}
              placeholder="1000"
              style={{ borderRadius: "0" }}
            />
            {errors.VNI && <div className="invalid-feedback">{errors.VNI}</div>}
          </div>
        </div>
      </div>
    </>
  );
}
