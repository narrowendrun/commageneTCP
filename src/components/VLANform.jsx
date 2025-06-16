import { useState } from "react";

export default function VlanForm() {
  const [vlan, setVlan] = useState("")

  const setOptionsFlag = () => {
    console.log('Options flag set - form data changed:', formData);
  };

  const handleFieldChange = (value) => {
    setVlan(value)
    setOptionsFlag();
  };

  return (
    <>
      
      <div className="filtereditform">
        <div className="row">
          <div className="col">

              <label htmlFor="vlan_input" className="form-label">VLAN(s)</label>
              <input
                id="vlan_input"
                type="text"
                className={`form-control`}
                value={vlan}
                onChange={(e) => handleFieldChange(e.target.value)}
                placeholder="10,20"
                style={{borderRadius:"0"}}
              />
            </div>

        </div>
      </div>
    </>
  );
}