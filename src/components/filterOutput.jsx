import { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
export default function FiltersOutput({optionsFlags, filters, setFilters }) {
  const [toggles, setToggles] = useState({});

  const handleToggle = (index) => {
    setToggles((prev) => ({
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
  return (
    <>
    <div className="filterOutputsContainer">
      <p id="firstPartCommand"><span>bash tcpdump</span>
                          <span id="optionFlags"> -
                              {optionsFlags.hostService}
                              {optionsFlags.printMAC}
                              {optionsFlags.verbosity}
                              {optionsFlags.quickDisplay}
                              {optionsFlags.timestamp}
                              {optionsFlags.interface}
                              {optionsFlags.packetCount}
                              {optionsFlags.flowDirection}
                          </span></p>
        {Object.keys(filters).map((index) => {
        const showFilter = toggles[index] ?? true;
        const firstIndex = Math.min(...Object.keys(filters).map(Number));
        return (
          <div className="filter_div" key={index}>
            {index !== firstIndex.toString() ? (
                filters[index].andor ? (
                  <button>or</button>
                ) : (
                  <button style={{ all: "unset" }}>or</button>
                )
              ) : null}
            <p className="filter_p"  onClick={() => handleToggle(index)}>{showFilter ? filters[index].filter : filters[index].name}</p>
            <TiDeleteOutline className="filterDeleteButton" onClick={()=>handleClick(index)}/>
          </div>
        );
      })}
    </div>
     
    </>
  );
}
