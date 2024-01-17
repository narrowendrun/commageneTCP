import { useEffect, useState } from "react";

export default function FilterParam({
  type,
  flag,
  first,
  value,
  mask,
  maskAll,
  setter,
}) {
  const [show, setShow] = useState(maskAll);
  useEffect(() => {
    setShow(maskAll);
  }, [maskAll]);
  const [andor, setAndor] = useState(parseInt(value));
  if (type == "FILTER") {
    return (
      <>
        {!first ? (
          <span className="filterItems" data-flag=" or ">
            {" "}
            or{" "}
          </span>
        ) : (
          ""
        )}
        <span
          className={
            show ? "maskFilters filterItems" : "flagFilters filterItems"
          }
          onClick={() => setShow(+!show)}
          data-flag={flag}
        >
          {show ? mask : flag}
        </span>
      </>
    );
  } else if (type == "PARAMETRE") {
    return (
      <>
        {!first ? (
          <button
            className="andorSwitcher"
            onClick={() => {
              setAndor(+!andor), setter();
            }}
          >
            <span
              className="filterItems"
              data-flag={andor == 0 ? " and " : " or "}
            >
              {andor == 0 ? " and " : " or "}
            </span>
          </button>
        ) : (
          ""
        )}
        <span
          className={
            show ? "maskFilters filterItems" : "flagFilters filterItems"
          }
          onClick={() => setShow(+!show)}
          data-flag={flag}
        >
          {show ? mask : flag}
        </span>
      </>
    );
  }
}
