import { useState, useEffect } from "react";

export default function SaveToFile({ setOptionsFlags }) {
  const [formData, setFormData] = useState({
    filename: "",
    filesize: "",
    filecount: "",
    filefrequency: ""
  });
  const [errors, setErrors] = useState({});
    const [button, setButton] = useState(false)

  const handleInputChange = (field) => (e) => {
    const inputValue = e.target.value;
    
    // For filename, allow any text
    if (field === "filename") {
      setFormData(prev => ({ ...prev, [field]: inputValue }));
      setErrors(prev => ({ ...prev, [field]: "" }));
      return;
    }
    
    // For numeric fields, validate
    if (inputValue === "" || /^\d+$/.test(inputValue)) {
      setFormData(prev => ({ ...prev, [field]: inputValue }));
      setErrors(prev => ({ ...prev, [field]: "" }));
    } else {
      setErrors(prev => ({ ...prev, [field]: "Enter only positive integers" }));
    }
  };

  const handleSave = () => {
    // Here you would implement the actual save logic
    console.log("Saving with options:", formData);
    
    // If you need to pass data back to parent component
    if (setOptionsFlags) {
      setOptionsFlags(formData);
    }
  };

   const [expand, setExpand] = useState({})
    useEffect(() => {
      if (!button) {
        setExpand({display:"none"})
      } else {
         setExpand({display:"inline"})
      }
      localStorage.setItem("tcp_optionsExpand", button);
    }, [button]);

  return (
    <div className="section" style={{ position: "relative", width: "60%", left: "20%" }}>
      <h4 style={{cursor:"pointer"}} onClick={()=>setButton(!button)}>Save to file?</h4>
      <div className="SaveFileInputFields" style={expand}>
        <label htmlFor="filename">
        Filename
      </label>
      <input
        id="filename"
        type="text"
        className="saveFileInputs form-control"
        placeholder="filename.pcap"
        value={formData.filename}
        onChange={handleInputChange("filename")}
        autoComplete="off"
        style={{ borderRadius: 0 }}
      />
        <br />
      <label htmlFor="filesize">
        File size (MB)
        {errors.filesize && (
          <span style={{ color: "red", marginLeft: "0.5em" }}>
            ({errors.filesize})
          </span>
        )}
      </label>
      <input
        id="filesize"
        type="text"
        className={`form-control ${errors.filesize ? "is-invalid" : ""}`}
        placeholder="integer (MB) or blank"
        value={formData.filesize}
        onChange={handleInputChange("filesize")}
        autoComplete="off"
        inputMode="numeric"
        pattern="[0-9]*"
        style={{ borderRadius: 0 }}
      />
    <br />
      <label htmlFor="filecount">
        Packet count
        {errors.filecount && (
          <span style={{ color: "red", marginLeft: "0.5em" }}>
            ({errors.filecount})
          </span>
        )}
      </label>
      <input
        id="filecount"
        type="text"
        className={`form-control ${errors.filecount ? "is-invalid" : ""}`}
        placeholder="integer or blank"
        value={formData.filecount}
        onChange={handleInputChange("filecount")}
        autoComplete="off"
        inputMode="numeric"
        pattern="[0-9]*"
        style={{ borderRadius: 0 }}
      />
    <br />
      <label htmlFor="filefrequency">
        Capture frequency (seconds)
        {errors.filefrequency && (
          <span style={{ color: "red", marginLeft: "0.5em" }}>
            ({errors.filefrequency})
          </span>
        )}
      </label>
      <input
        id="filefrequency"
        type="text"
        className={`form-control ${errors.filefrequency ? "is-invalid" : ""}`}
        placeholder="integer or blank"
        value={formData.filefrequency}
        onChange={handleInputChange("filefrequency")}
        autoComplete="off"
        inputMode="numeric"
        pattern="[0-9]*"
        style={{ borderRadius: 0 }}
      />
      </div>
    </div>
  );
}