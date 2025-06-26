import { useState } from "react";
import { TiDeleteOutline, TiEdit } from "react-icons/ti";
import VxlanForm from "./VXLANform";
import VlanForm from "./VLANform";
import MACForm from "./MACform";
import IPform from "./IPform";
import IP6form from "./IP6form";
import PortForm from "./portForm";

export default function FiltersOutput({
  optionsFlags,
  filters,
  setFilters,
  showHide,
}) {
  const [showNames, setShowNames] = useState({});
  const [showEditForms, setShowEditForms] = useState({});
  const [buttonTexts, setButtonTexts] = useState({}); // Track button text state

  const handleToggle = (index) => {
    setShowNames((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleClick = (index) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      delete newFilters[index];
      return newFilters;
    });
  };

  const handleEditToggle = (index) => {
    setShowEditForms((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // New function to handle and/or button toggle
  const handleAndOrToggle = (index) => {
    const newAndor = buttonTexts[index] === "and" ? "or" : "and";
    setButtonTexts((prev) => ({
      ...prev,
      [index]: newAndor,
    }));
    setFilters((prevFilters) => {
      let newFilters = { ...prevFilters };
      newFilters[index].andorVal = newAndor;
      return newFilters;
    });
  };

  return (
    <>
      <div className="filterOutputsContainer">
        <p id="firstPartCommand">
          <span>bash tcpdump</span>
          <span id="optionFlags">
            {" "}
            -{optionsFlags.hostService}
            {optionsFlags.printMAC}
            {optionsFlags.verbosity}
            {optionsFlags.quickDisplay}
            {optionsFlags.timestamp}
            {optionsFlags.interface}
            {optionsFlags.packetCount}
            {optionsFlags.flowDirection}
            {optionsFlags.filename}
            {optionsFlags.filesize}
            {optionsFlags.filecount}
            {optionsFlags.filefrequency}
          </span>
        </p>
        {Object.keys(filters).map((index) => {
          const firstIndex = Math.min(...Object.keys(filters).map(Number));
          const showEditForm = showEditForms[index] ?? false;
          const currentButtonText = buttonTexts[index] || "or";

          return (
            <div className="filter_div" key={index}>
              {index !== firstIndex.toString() ? (
                filters[index].andor ? (
                  <button onClick={() => handleAndOrToggle(index)}>
                    {currentButtonText}
                  </button>
                ) : (
                  <button style={{ all: "unset" }}>or</button>
                )
              ) : null}
              <p className="filter_p" onClick={() => handleToggle(index)}>
                {!showHide ? filters[index].filter : filters[index].name}
              </p>
              {filters[index].edit ? (
                <TiEdit
                  className="filterEditButton"
                  onClick={() => handleEditToggle(index)}
                />
              ) : null}
              {filters[index].edit &&
              filters[index].name == "VXLAN" &&
              showEditForm ? (
                <VxlanForm setFilters={setFilters} index={index} />
              ) : null}
              {filters[index].edit &&
              filters[index].name == "VLAN" &&
              showEditForm ? (
                <VlanForm setFilters={setFilters} index={index} />
              ) : null}
              {filters[index].edit &&
              filters[index].name == "MAC" &&
              showEditForm ? (
                <MACForm setFilters={setFilters} index={index} />
              ) : null}
              {filters[index].edit &&
              filters[index].name == "IPv4" &&
              showEditForm ? (
                <IPform setFilters={setFilters} index={index} />
              ) : null}
              {filters[index].edit &&
              filters[index].name == "IPv6" &&
              showEditForm ? (
                <IP6form setFilters={setFilters} index={index} />
              ) : null}
              {filters[index].edit &&
              filters[index].name == "UDP" &&
              showEditForm ? (
                <PortForm
                  setFilters={setFilters}
                  index={index}
                  protocol={"udp"}
                />
              ) : null}
              {filters[index].edit &&
              filters[index].name == "TCP" &&
              showEditForm ? (
                <PortForm
                  setFilters={setFilters}
                  index={index}
                  protocol={"tcp"}
                />
              ) : null}
              <TiDeleteOutline
                className="filterDeleteButton"
                onClick={() => handleClick(index)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
