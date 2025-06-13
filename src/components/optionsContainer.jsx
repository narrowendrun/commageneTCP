import SwitchButton from "./options/switchButton";
import PacketCount from "./options/packetCount";
import CheckBox from "./options/Checkbox";
import { useState, useEffect } from "react";
import VerboseSlider from "./options/verboseSlider";
import Timestamp from "./options/timestamp";
export default function OptionsContainer({setOptionsFlags}) {
  const [button, setButton] = useState(() => {
    if (
      localStorage.getItem("tcp_optionsExpand") == "false" ||
      localStorage.getItem("tcp_optionsExpand") == null
    ) {
      return false;
    } else {
      return true;
    }
  });
  const [optionsExpand, setOptionsExpand] = useState({})
  useEffect(() => {
    if (!button) {
      setOptionsExpand({display:"none"})
    } else {
       setOptionsExpand({display:"inline"})
    }
    localStorage.setItem("tcp_optionsExpand", button);
  }, [button]);
  return (
    <>
      <div className="container optionsSection section" >
        <h2 id="optionsHeader"
          onClick={()=>setButton(!button)}
        >
          Options
        </h2>
        <div className="container">
          <div id="container optionsContainer" style={optionsExpand}>
            <br />
            <div className="row">
                <div className="optionsColumn col">
                    <VerboseSlider setOptionsFlags={setOptionsFlags}/>
                </div>
                <div className="optionsColumn col">
                    <Timestamp setOptionsFlags={setOptionsFlags}/>
                </div>
            </div>
            <div className="row">
                <div className="optionsColumn col">
                    <CheckBox
                        setOptionsFlags={setOptionsFlags}
                        title={"resolve names?"}
                        flagOption={["host", "service"]}
                        filename={["tcp_hostName", "tcp_serviceName"]}
                        disableCondition={true}
                        defaultValue={"false"}
                        flagLogic={"hostService"}
                    />
                </div>
                <div className="optionsColumn col">
                    <SwitchButton
                        setOptionsFlags={setOptionsFlags}
                        option={"printMAC"}
                        filename={"tcp_printMAC"}
                        flag={"e"}
                        title={"print MAC address?"}
                    />
                </div>
                <div className="optionsColumn col">
                    <SwitchButton
                        setOptionsFlags={setOptionsFlags}
                        option={"quickDisplay"}
                        filename={"tcp_quickDisplay"}
                        flag={"q"}
                        title={"enable quick display?"}
                    />
                </div>
            </div>
            <div className="row">
                <div className="optionsColumn col">
                    <PacketCount setOptionsFlags={setOptionsFlags}/>
                </div>
                <div className="optionsColumn col-4">
                    <CheckBox
                        setOptionsFlags={setOptionsFlags}
                        title={"flow direction?"}
                        flagOption={["in", "out"]}
                        filename={["tcp_inflow", "tcp_outflow"]}
                        disableCondition={false}
                        defaultValue={"true"}
                        flagLogic={"flowDirection"}
                    />
                </div>
            </div>
        </div>
        </div>
      </div>
    </>
  );
}
