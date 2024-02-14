import { useState, useEffect, useRef } from "react";
import PPbutton from "./PPbutton";
import ParamInput from "./ParamInput";
import { applyLogic } from "../JSscripts/ParamApplyLogic";

export default function ParamButton({ dispatch }) {
  const [state, setState] = useState({
    VLAN: true,
    MAC: true,
    VXLAN: true,
  });
  const [textVal, setTextVal] = useState({
    VLAN: "",
    srcMAC: "",
    dstMAC: "",
    innerSrcMAC: "",
    innerDstMAC: "",
    innerSrcIP: "",
    innerDstIP: "",
    VNI: "",
  });
  const prevtextValRef = useRef(textVal);
  const [commandText, setCommandText] = useState({
    VLAN: "",
    srcMAC: "",
    dstMAC: "",
    VXLAN: "port 4789 and udp[8:2] = 0x0800",
    innerSrcMAC: "",
    innerDstMAC: "",
    innerSrcIP: "",
    innerDstIP: "",
    VNI: "",
  });
  const _setTextVal = (field, value) => {
    // dispatch({
    //   type: "DELETE",
    //   payload: { flag: commandText[field], mask: field },
    // });
    setTextVal((prevText) => ({
      ...prevText,
      [field]: value,
    }));
  };
  const _setCommandText = (field, value) => {
    setCommandText((prevText) => ({
      ...prevText,
      [field]: value,
    }));
  };
  const _setState = (button) => {
    let temp = state[button];
    setState((prevState) => ({
      ...prevState,
      [button]: !temp,
    }));
  };
  function clearEmAll(array) {
    for (let i = 0; i < array.length; i++) {
      let key = array[i];
      dispatch({
        type: "DELETE",
        payload: { flag: commandText[key], mask: key },
      });
      _setTextVal(key, "");
      _setCommandText(key, "");
    }
  }

  useEffect(() => {
    if (state.VLAN) {
      dispatch({
        type: "DELETE",
        payload: { flag: commandText.VLAN, mask: "VLAN" },
      });
      _setTextVal("VLAN", "");
    }
  }, [state.VLAN]);
  useEffect(() => {
    let array = ["srcMAC", "dstMAC"];
    if (state.MAC) {
      clearEmAll(array);
    }
  }, [state.MAC]);

  useEffect(() => {
    if (state.VXLAN) {
      let array = [
        "VXLAN",
        "innerSrcMAC",
        "innerDstMAC",
        "innerSrcIP",
        "innerDstIP",
        "VNI",
      ];
      clearEmAll(array);
      _setCommandText("VXLAN", "port 4789 and udp[8:2] = 0x0800");
    } else if (!state.VXLAN) {
      dispatch({
        type: "PARAMETRE",
        payload: { flag: commandText.VXLAN, mask: "all VXLAN" },
      });
    }
  }, [state.VXLAN]);

  useEffect(() => {
    //over here we are trying to figure out which key has been changed inside textVal and applying logic conditionally
    // Get the previous textVal object value using the ref
    const prevtextVal = prevtextValRef.current;

    // Iterate through the keys of the current textVal
    Object.keys(textVal).forEach((key) => {
      const currentValue = textVal[key];
      const prevValue = prevtextVal[key];

      // Check if the value for this key has changed
      if (currentValue !== prevValue) {
        let temp_command = applyLogic(key, textVal[key]);
        if (temp_command !== "" && temp_command !== undefined) {
          dispatch({
            type: "DELETE",
            payload: { flag: commandText[key], mask: key },
          });
          _setCommandText(key, temp_command);
          dispatch({
            type: "PARAMETRE",
            payload: { flag: temp_command, mask: key },
          });
        }
        console.log("prevValue : ", prevValue);
        // console.log("current temp command : ", temp_command);
        // if (temp_command == "") {
        //   dispatch({
        //     type: "REPLACE",
        //     payload: { place: commandText[key], mask: key, replace: "" },
        //   });
        //   _setCommandText(key, "");
        // }
      }
    });
    // Update the previous dataObject ref with the current value
    prevtextValRef.current = textVal;
  }, [textVal]); // dataObject is the dependency array

  return (
    <>
      <PPbutton
        onclick={() => _setState("VLAN")}
        text="VLAN"
        isActive={state.VLAN}
      />
      <PPbutton
        onclick={() => _setState("MAC")}
        text="MAC"
        isActive={state.MAC}
      />
      <PPbutton
        onclick={() => _setState("VXLAN")}
        text="VXLAN"
        isActive={state.VXLAN}
      />
      {!state.VLAN && (
        <ParamInput
          shoulddiv="true"
          id="VLAN"
          title="Enter VLAN"
          value={textVal.VLAN}
          onchange={(e) => _setTextVal("VLAN", e.target.value)}
        />
      )}
      {!state.MAC && (
        <div className="container vlanInput">
          <div className="row">
            <div className="col">
              <ParamInput
                id="srcMAC"
                title="src MAC"
                value={textVal.srcMAC}
                onchange={(e) => _setTextVal("srcMAC", e.target.value)}
              />
            </div>

            <div className="col">
              <ParamInput
                id="dstMAC"
                title="dst MAC"
                value={textVal.dstMAC}
                onchange={(e) => _setTextVal("dstMAC", e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
      {!state.VXLAN && (
        <div className="container vlanInput">
          <div className="row">
            <div className="col">
              <label>inner src MAC</label>
              <input
                type="text"
                className="form-control"
                value={textVal.innerSrcMAC}
                onChange={(e) => _setTextVal("innerSrcMAC", e.target.value)}
              />
            </div>

            <div className="col">
              <label>inner dst MAC</label>
              <input
                type="text"
                className="form-control"
                value={textVal.innerDstMAC}
                onChange={(e) => _setTextVal("innerDstMAC", e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>inner src IP</label>
              <input
                type="text"
                className="form-control"
                value={textVal.innerSrcIP}
                onChange={(e) => _setTextVal("innerSrcIP", e.target.value)}
              />
            </div>

            <div className="col">
              <label>inner dst IP</label>
              <input
                type="text"
                className="form-control"
                value={textVal.innerDstIP}
                onChange={(e) => _setTextVal("innerDstIP", e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>VNI</label>
              <input
                type="text"
                className="form-control"
                value={textVal.VNI}
                onChange={(e) => _setTextVal("VNI", e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
