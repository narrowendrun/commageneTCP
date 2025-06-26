import { useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";

export default function CommandCache({ commandCache, setCommandCache }) {
  const [copiedId, setCopiedId] = useState(null);

  function copyCommand(id) {
    navigator.clipboard.writeText(commandCache[id].command);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function deleteCommand(id) {
    setCommandCache((prevCache) => {
      const updatedCache = { ...prevCache };
      delete updatedCache[id];
      localStorage.setItem("tcp_commandCache", JSON.stringify(updatedCache));
      return updatedCache;
    });
  }
  function handleCommentChange(id, newComment) {
    setCommandCache((prevCache) => {
      const updatedCache = {
        ...prevCache,
        [id]: {
          ...prevCache[id],
          comments: newComment,
        },
      };
      localStorage.setItem("tcp_commandCache", JSON.stringify(updatedCache));
      return updatedCache;
    });
  }

  return (
    <>
      <div className="container section">
        <h2 className="filtersHeader">
          Command Cache {`(${Object.keys(commandCache).length})`}
        </h2>
        <br />
        <div className="commandCache">
          {Object.keys(commandCache).map((id) => (
            <div key={id} className="commandCacheEntry row">
              <div className="commandEntryColumn col-2">
                {commandCache[id].date}
              </div>
              <div className="commandEntryColumn col-4">
                {commandCache[id].command}
              </div>
              <div className="commandEntryColumn col-3">
                <textarea
                  name={`commandEntry${id}`}
                  id={id}
                  value={commandCache[id].comments}
                  onChange={(e) => handleCommentChange(id, e.target.value)}
                />
              </div>
              <div className="commandEntryColumn col-1">
                <MdOutlineContentCopy
                  className="cacheEntryButton"
                  onClick={() => copyCommand(id)}
                />
                {copiedId === id && (
                  <span
                    style={{
                      position: "relative",
                      top: "0%",
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
              <div className="commandEntryColumn col-1">
                <TiDeleteOutline
                  className="cacheEntryButton"
                  onClick={() => deleteCommand(id)}
                />
              </div>
            </div>
          ))}
        </div>
        <br />
        <center>
          <p>{Object.keys(commandCache).length} commands cached</p>
        </center>
      </div>
    </>
  );
}
