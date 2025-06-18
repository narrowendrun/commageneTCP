import { MdOutlineContentCopy } from "react-icons/md";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import FiltersOutput from "./filterOutput";
import { useState } from "react";

export default function Output({ optionsFlags, filters, setFilters }) {
  const [showHide, setShowHide] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyFilters = async () => {
    try {
      const container = document.querySelector(".filterOutputsContainer");
      if (!container) {
        console.error("FilterOutputsContainer not found");
        return;
      }
      const textContent = container.innerText || container.textContent;

      await navigator.clipboard.writeText(textContent);
    } catch (error) {
      console.error("Failed to copy content:", error);

      try {
        const container = document.querySelector(".filterOutputsContainer");
        const textArea = document.createElement("textarea");
        textArea.value = container.innerText || container.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        console.log("Content copied using fallback method!");
      } catch (fallbackError) {
        console.error("Fallback copy method also failed:", fallbackError);
      }
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // message disappears after 2 seconds
  };

  return (
    <>
      <div className="container outputContainer">
        <div className="showHideFilters">
          {showHide ? (
            <BiSolidShow
              className="showHideButton"
              onClick={() => setShowHide(!showHide)}
            />
          ) : (
            <BiSolidHide
              className="showHideButton"
              onClick={() => setShowHide(!showHide)}
            />
          )}
        </div>

        <div id="bashContainer" className="container">
          <div className="row">
            <div className="commandContainer col commandColumn">
              <FiltersOutput
                optionsFlags={optionsFlags}
                filters={filters}
                setFilters={setFilters}
                showHide={showHide}
              />
            </div>

            <div
              className="col-1 copyButton commandColumn"
              onClick={handleCopyFilters}
              style={{ position: "relative" }}
            >
              <MdOutlineContentCopy />
              {copied && (
                <span
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    backgroundColor: "#28a745",
                    color: "white",
                    padding: "2px 6px",
                    fontSize: "0.75rem",
                    borderRadius: "4px",
                    transition: "opacity 0.3s",
                    zIndex: 10,
                  }}
                >
                  Copied!
                </span>
              )}
            </div>
          </div>
        </div>

        <br />
        <br />

        <div id="wiresharkContainer" className="container">
          <div className="row">
            <div className="commandContainer col commandColumn">
              <span>wireshark</span>
            </div>
            <div className="col-1 copyButton commandColumn">
              <MdOutlineContentCopy />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
