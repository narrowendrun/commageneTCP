import { useState } from "react";

export default function FilterButton({ title, dispatch, protocol }) {
  const [state, setState] = useState(true);
  return (
    <>
      <button
        className="filterButton btn btn-primary"
        id={title + "button"}
        value={protocol}
        onClick={() => {
          dispatch({
            type: state ? "FILTER" : "DELETE",
            payload: { flag: protocol, mask: title },
          });
          setState(!state);
        }}
        style={{
          background: state ? "blue" : "white",
          color: state ? "white" : "blue",
          borderColor: state ? "white" : "blue",
        }}
      >
        {title}
      </button>
    </>
  );
}
