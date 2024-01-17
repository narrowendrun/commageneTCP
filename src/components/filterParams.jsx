import { useEffect, useState } from "react";

export default function FilterParam({
  type,
  flag,
  first,
  value,
  mask,
  maskAll,
}) {
  const [show, setShow] = useState(maskAll);
  useEffect(() => {
    setShow(maskAll);
  }, [maskAll]);
  const [andor, setAndor] = useState(parseInt(value));
  if (type == "FILTER") {
    return (
      <>
        {!first ? <span> or </span> : ""}
        <span
          className={show ? "maskFilters" : "flagFilters"}
          onClick={() => setShow(+!show)}
        >
          {show ? mask : flag}
        </span>
      </>
    );
  } else if (type == "PARAMETRE") {
    return (
      <>
        {!first ? (
          <button className="andorSwitcher" onClick={() => setAndor(+!andor)}>
            {andor == 0 ? " and " : " or "}
          </button>
        ) : (
          ""
        )}
        <span
          className={show ? "maskFilters" : "flagFilters"}
          onClick={() => setShow(+!show)}
        >
          {show ? mask : flag}
        </span>
      </>
    );
  }
}
