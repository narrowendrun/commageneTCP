export default function ParamInput({
  shoulddiv,
  id,
  title,
  value,
  onchange,
  //onkeydown,
}) {
  const inputElement = (
    <>
      <label htmlFor={`ParamInput${id}`}>{title}</label>
      <br />
      <input
        type="text"
        id={`ParamInput${id}`}
        className="form-control"
        value={value}
        onChange={onchange}
        //onKeyDown={onkeydown}
      />
    </>
  );
  return shoulddiv == "true" ? (
    <div className="container vlanInput">{inputElement}</div>
  ) : (
    inputElement
  );
}
