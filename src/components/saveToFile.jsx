import { useState, useEffect } from "react";

export default function SaveToFile({ setOptionsFlags }) {
  const [formData, setFormData] = useState({
    filename: "",
    filesize: "",
    filecount: "",
    filefrequency: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));

    if (field === "filename") {
      updateFlags(field, value);
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } else if (value === "" || /^\d+$/.test(value)) {
      updateFlags(field, value);
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "Enter only positive integers" }));
    }
  };

  const updateFlags = (field, value) => {
    const flagMap = {
      filename: " -w",
      filesize: " -C",
      filecount: " -W",
      filefrequency: " -G"
    };

    setOptionsFlags((prev) => {
      const newFlags = { ...prev };
      if (value.trim() === "") {
        delete newFlags[field];
      } else {
        newFlags[field] = `${flagMap[field]} ${value}`;
      }
      return newFlags;
    });
  };

  useEffect(()=>{
    if(!isExpanded){
      setOptionsFlags((prev) => {
      const newFlags = { ...prev };
      delete newFlags.filename;
      delete newFlags.filesize
      delete newFlags.filecount
      delete newFlags.filefrequency
      return newFlags;
    });
    } else{
     Object.entries(formData).forEach(([key, value]) => {
    updateFlags(key, value);
  });
    }
  },[isExpanded])

  return (
    <div className="section" style={{ position: "relative", width: "60%", left: "20%" }}>
      <h4 style={{ cursor: "pointer" }} onClick={() => setIsExpanded((prev) => !prev)}>
        Save to file?
      </h4>

      {isExpanded && (
        <div className="SaveFileInputFields">
          <InputField
            id="filename"
            label="Filename"
            value={formData.filename}
            error={errors.filename}
            onChange={handleInputChange("filename")}
            placeholder="filename.pcap"
          />

          <InputField
            id="filesize"
            label="File size (MB)"
            value={formData.filesize}
            error={errors.filesize}
            onChange={handleInputChange("filesize")}
            placeholder="integer (MB) or blank"
          />

          <InputField
            id="filecount"
            label="Packet count"
            value={formData.filecount}
            error={errors.filecount}
            onChange={handleInputChange("filecount")}
            placeholder="integer or blank"
          />

          <InputField
            id="filefrequency"
            label="Capture frequency (seconds)"
            value={formData.filefrequency}
            error={errors.filefrequency}
            onChange={handleInputChange("filefrequency")}
            placeholder="integer or blank"
          />
        </div>
      )}
    </div>
  );
}

function InputField({ id, label, value, error, onChange, placeholder }) {
  return (
    <>
      <label htmlFor={id}>
        {label}
        {error && <span style={{ color: "red", marginLeft: "0.5em" }}>({error})</span>}
      </label>
      <input
        id={id}
        type="text"
        className={`form-control ${error ? "is-invalid" : ""}`}
        value={value}
        onChange={onChange}
        autoComplete="off"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder={placeholder}
        style={{ borderRadius: 0, marginBottom: "1em" }}
      />
    </>
  );
}
