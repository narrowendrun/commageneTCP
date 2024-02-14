import { useEffect, useState } from "react";

export default function FilterParam({
  type,
  flag,
  first,
  value,
  mask,
  maskAll,
  setter,
  paranthesisBefore,
}) {
  const [show, setShow] = useState(maskAll);
  useEffect(() => {
    setShow(maskAll);
  }, [maskAll]);
  const [andor, setAndor] = useState(value ? parseInt(value) : 0);
  if (type == "FILTER") {
    return (
      <>
        {!first && !paranthesisBefore ? (
          <span
            className="filterItems"
            data-flag=" or "
            style={{ userSelect: "none" }}
          >
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
        {!first && !paranthesisBefore ? (
          <button
            className="andorSwitcher"
            style={{ userSelect: "none" }}
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
  } else if (type == "parantheses") {
    if (flag.includes("("))
      return (
        <>
          {!paranthesisBefore ? (
            <button
              className="andorSwitcher"
              style={{ userSelect: "none" }}
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
          <span className="filterItems  parantheses" data-flag={flag}>
            {flag}
          </span>
        </>
      );
    if (flag.includes(")"))
      return (
        <>
          <span className="filterItems  parantheses" data-flag={flag}>
            {flag}
          </span>
        </>
      );
  }
}
