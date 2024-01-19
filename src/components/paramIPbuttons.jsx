import { useState, useEffect, useRef } from "react";
import ParamInput from "./ParamInput";
import PPbutton from "./PPbutton";
export default function IPparamButtons({ dispatch }) {
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
  const [state, setState] = useState({
    IPv4: true,
    IPv6: true,
  });
  const [commandText, setCommandText] = useState({
    srcIPv4: "ip",
    dstIPv4: "",
    srcIPv6: "ip6",
    dstIPv6: "",
  });
  const [textVal, setTextVal] = useState({
    srcIPv4: "",
    dstIPv4: "",
    srcIPv6: "",
    dstIPv6: "",
  });
  const prevtextValRef = useRef(textVal);
  const _setState = (button) => {
    let temp = state[button];
    setState((prevState) => ({
      ...prevState,
      [button]: !temp,
    }));
  };
  const _setTextVal = (field, value) => {
    let temp = textVal[field];
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
  useEffect(() => {
    let array = ["srcIPv4", "dstIPv4"];
    if (state.IPv4) {
      clearEmAll(array);
      _setCommandText("srcIPv4", "ip");
    } else if (!state.IPv4) {
      console.log("ip");
      dispatch({
        type: "PARAMETRE",
        payload: { flag: commandText.srcIPv4, mask: "all IPv4" },
      });
    }
  }, [state.IPv4]);
  useEffect(() => {
    let array = ["srcIPv6", "dstIPv6"];
    if (state.IPv6) {
      clearEmAll(array);
      _setCommandText("srcIPv6", "ip6");
    } else if (!state.IPv6) {
      console.log("ip6");
      dispatch({
        type: "PARAMETRE",
        payload: { flag: commandText.srcIPv6, mask: "all IPv6" },
      });
    }
  }, [state.IPv6]);

  function IPcleanse(version, value) {
    if (version == 4) {
      let array = value.split(".").filter((element) => element.trim() !== "");
      if (value == "" || value.includes(" ")) {
        console.log("blank");
        return false;
      }
      if (value.includes(".") && array.length == 4) {
        for (let i = 0; i < array.length; i++) {
          if (parseInt(array[i]) > 255) return `invalid ipv4`;
        }
        return value;
      }
      return `invalid ipv4`;
    }
    if (version == 6) {
      const ipv6Regex =
        /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;

      if (ipv6Regex.test(value)) {
        let expanded = value.toLowerCase(); // Ensure lowercase

        while (expanded.includes("::")) {
          const parts = expanded.split("::");
          const missingSegments =
            8 - (parts[0].split(":").length + parts[1].split(":").length);
          expanded =
            parts[0] + new Array(missingSegments + 2).join(":0000") + parts[1];
        }

        return expanded;
      } else {
        return false;
      }
    }
  }
  function applyLogic(key, value) {
    if (key.includes("4")) {
      if (commandText.srcIPv4 == "ip") {
        _setCommandText("srcIPv4", "");
        dispatch({
          type: "DELETE",
          payload: { flag: commandText.srcIPv4, mask: "all IPv4" },
        });
      }
    }
    if (key.includes("6")) _setCommandText("srcIPv6", "");
    if (key == "srcIPv4") return `ip src ${IPcleanse(4, value)}`;
    if (key == "dstIPv4") return `ip dst ${IPcleanse(4, value)}`;
    if (key == "srcIPv6") return `ip6 host ${IPcleanse(6, value)}`;
    if (key == "dstIPv6") return `ip6 host ${IPcleanse(6, value)}`;
  }
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
        console.log("temp_command", temp_command);
        dispatch({
          type: "DELETE",
          payload: { flag: commandText[key], mask: key },
        });
        if (temp_command !== undefined && !temp_command.includes(false)) {
          _setCommandText(key, temp_command);
          dispatch({
            type: "PARAMETRE",
            payload: { flag: temp_command, mask: key },
          });
        }
      }
    });
    // Update the previous dataObject ref with the current value
    prevtextValRef.current = textVal;
  }, [textVal]); // dataObject is the dependency array
  return (
    <>
      <PPbutton
        onclick={() => _setState("IPv4")}
        text="IPv4"
        isActive={state.IPv4}
      />
      <PPbutton
        onclick={() => _setState("IPv6")}
        text="IPv6"
        isActive={state.IPv6}
      />
      {!state.IPv4 && (
        <div className="container vlanInput">
          <div className="row">
            <div className="col">
              <ParamInput
                id="srcIPv4"
                title="src IPv4"
                value={textVal.srcIPv4}
                onchange={(e) => _setTextVal("srcIPv4", e.target.value)}
              />
            </div>

            <div className="col">
              <ParamInput
                id="dstIPv4"
                title="dst IPv4"
                value={textVal.dstIPv4}
                onchange={(e) => _setTextVal("dstIPv4", e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
      {!state.IPv6 && (
        <div className="container vlanInput">
          <div className="row">
            <div className="col">
              <ParamInput
                id="srcIPv6"
                title="src IPv6"
                value={textVal.srcIPv6}
                onchange={(e) => _setTextVal("srcIPv6", e.target.value)}
              />
            </div>

            <div className="col">
              <ParamInput
                id="dstIPv6"
                title="dst IPv6"
                value={textVal.dstIPv6}
                onchange={(e) => _setTextVal("dstIPv6", e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
