import { useState } from "react";
import Interface from "./components/interface";
import OptionsContainer from "./components/optionsContainer";
import Output from "./components/output";
import FiltersContainer from "./components/filtersContainer";
import SaveToFile from "./components/saveToFile";
import CommandCache from "./components/commandCache";

function App() {
  const [optionsFlags, setOptionsFlags] = useState({
    hostService: "",
    printMAC: "",
    verbosity: "",
    quickDisplay: "",
    timestamp: "",
    interface: "i any",
    packetCount: "",
    flowDirection: "",
    filename: "",
    filesize: "",
    filecount: "",
    filefrequency: "",
  });
  const [filters, setFilters] = useState({});
  const [commandCache, setCommandCache] = useState(() => {
    const storedCache = localStorage.getItem("tcp_commandCache");
    return storedCache ? JSON.parse(storedCache) : {};
  });

  return (
    <>
      <br />
      <br />
      <Interface setOptionsFlags={setOptionsFlags} />
      <br />
      <br />
      <OptionsContainer setOptionsFlags={setOptionsFlags} />
      <br />
      <br />
      <SaveToFile setOptionsFlags={setOptionsFlags} />
      <br />
      <br />
      <FiltersContainer setFilters={setFilters} />
      <br />
      <br />
      <Output
        optionsFlags={optionsFlags}
        filters={filters}
        setFilters={setFilters}
        setCommandCache={setCommandCache}
      />
      <br />
      <br />
      <CommandCache
        commandCache={commandCache}
        setCommandCache={setCommandCache}
      />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default App;
