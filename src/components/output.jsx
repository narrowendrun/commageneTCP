import { MdOutlineContentCopy } from "react-icons/md";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import FiltersOutput from "./filterOutput";
import { useState } from "react";
import React from "react";

export default function Output({
  optionsFlags,
  filters,
  setFilters,
  setCommandCache,
}) {
  const [showHide, setShowHide] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copied2, setCopied2] = useState(false);

  const handleCopyFilters = async () => {
    try {
      setShowHide(false);

      // Wait for DOM to update (1 frame delay)
      requestAnimationFrame(() => {
        const container = document.querySelector(".filterOutputsContainer");
        if (!container) {
          console.error("FilterOutputsContainer not found");
          return;
        }

        const textContent = (container.innerText || container.textContent)
          .replace(/\s+/g, " ")
          .trim();

        navigator.clipboard.writeText(textContent).then(() => {
          setCommandCache((currentcache) => {
            const isDuplicate = Object.values(currentcache).some(
              (entry) => entry.command === textContent
            );

            if (isDuplicate) {
              return currentcache;
            }

            const today = new Date();
            const f = new Intl.DateTimeFormat("en-in", {
              dateStyle: "short",
              timeStyle: "short",
            });
            const id = crypto.randomUUID();

            const newCache = {
              ...currentcache,
              [id]: {
                id,
                date: f.format(today),
                command: textContent,
                comments: "",
              },
            };
            localStorage.setItem("tcp_commandCache", JSON.stringify(newCache));

            return newCache;
          });

          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      });
    } catch (error) {
      console.error("Failed to copy content:", error);
    }
  };

  function copyWireshark() {
    const container = document.querySelector(".wiresharkContainer");
    if (!container) return;
    const textToCopy = container.textContent.trim();

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied2(true);
        setTimeout(() => setCopied2(false), 2000);
        setCommandCache((currentcache) => {
          const isDuplicate = Object.values(currentcache).some(
            (entry) => entry.command === textToCopy
          );

          if (isDuplicate) {
            return currentcache; // Duplicate detected; no need to update or store.
          }

          const today = new Date();
          const f = new Intl.DateTimeFormat("en-in", {
            dateStyle: "short",
            timeStyle: "short",
          });
          const id = crypto.randomUUID();

          const newCache = {
            ...currentcache,
            [id]: {
              id,
              date: f.format(today),
              command: textToCopy,
              comments: "",
            },
          };
          localStorage.setItem("tcp_commandCache", JSON.stringify(newCache));

          return newCache;
        });
      })
      .catch((err) => {
        console.error("Copy failed, my liege:", err);
      });
  }

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
            <div className="wiresharkContainer commandContainer col commandColumn">
              <p>{`ssh root@switch "tcpdump -s 0 -Un -w - -${optionsFlags.interface} `}</p>
              {Object.keys(filters).map((index) => {
                const firstIndex = Math.min(
                  ...Object.keys(filters).map(Number)
                );
                return (
                  <React.Fragment key={index}>
                    <p>
                      {firstIndex.toString() !== index
                        ? filters[index].andor
                          ? filters[index].andorVal
                          : "or"
                        : ""}
                    </p>
                    <p>{filters[index].filter}</p>
                  </React.Fragment>
                );
              })}
              <p>" | wireshark -k -i -</p>
            </div>
            <div className="col-1 copyButton commandColumn">
              <MdOutlineContentCopy onClick={() => copyWireshark()} />
              {copied2 && (
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
      </div>
    </>
  );
}
