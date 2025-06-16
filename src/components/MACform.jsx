import { useState, useEffect } from "react";
import { macLogic } from "../macLogic";

export default function MACForm({ setFilters, index }) {
  const [MACs, setMACs] = useState({srcMAC:"",dstMAC:""})
  const [formData, setFormData] = useState({
    srcMAC: '',
    dstMAC: '',
  });

  const [errors, setErrors] = useState({
    srcMAC: '',
    dstMAC: ''
  });

  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));

    const macOutput = macLogic("outermac", value);
    setMACs((prev)=>{
      let newMAC = {...prev}
      if(fieldName=="srcMAC") 
        {
          newMAC[fieldName] = `ether src ${macOutput}`

        }
      else{
         newMAC[fieldName] = `ether dst ${macOutput}`
      }
      return newMAC
    })

    if (macOutput === "invalid mac") {
      setErrors(prev => ({
        ...prev,
        [fieldName]: "Invalid MAC address"
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ""
      }));

      setFilters((prevFilters)=>{
        let newFilters = {...prevFilters}
        console.log(newFilters[index])
        console.log("srcMAC", MACs.srcMAC)
        newFilters[index].filter = MACs.srcMAC
        return newFilters
      })
    }
  };

  return (
    <div className="filtereditform">
      <div className="row">
        <div className="col">
          <label htmlFor="srcMAC_input" className="form-label">Inner Src MAC</label>
          <input
            id="srcMAC_input"
            type="text"
            className={`form-control ${errors.srcMAC ? 'is-invalid' : ''}`}
            value={formData.srcMAC}
            onChange={(e) => handleFieldChange('srcMAC', e.target.value)}
            placeholder="00:00:00:00:00:00"
            style={{ borderRadius: "0" }}
          />
          {errors.srcMAC && (
            <div className="invalid-feedback">{errors.srcMAC}</div>
          )}
        </div>

        <div className="col">
          <label htmlFor="dstMAC_input" className="form-label">Inner Dst MAC</label>
          <input
            id="dstMAC_input"
            type="text"
            className={`form-control ${errors.dstMAC ? 'is-invalid' : ''}`}
            value={formData.dstMAC}
            onChange={(e) => handleFieldChange('dstMAC', e.target.value)}
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
