function _MACLogic(value) {
  let temp = [];
  if (value.includes(".")) {
    let mac = value.split(".");
    if (mac.length !== 3 || mac[mac.length - 1] == "") {
      return "invalid mac";
    }
    for (let i = 0; i < mac.length; i++) {
      if (mac[i].length < 4) {
        let temp = mac[i];
        mac[i] = "0".repeat(4 - mac[i].length) + temp;
      }
    }
    mac = mac.join("");
    for (let i = 0; i < mac.length; i += 2) {
      let pair = mac.slice(i, i + 2);

      temp.push(pair);
    }
    return temp.join(":");
  } else if (value.includes("-")) {
    let mac = value.split("-");
    let _mac = mac.join("");
    if (mac.length == 6 && _mac.length == 12) return mac.join(":");
    //else return "invalid mac";
  } else if (value.includes(":")) {
    let mac = value.split(":");
    let _mac = mac.join("");
    if (mac.length == 6 && _mac.length == 12) return value;
    else return "invalid mac";
  } else if (value !== "") return "invalid mac";
  else return "";
}

export function MACLogic(key, value) {
  //set src and dst to proper colon format
  let mac = _MACLogic(value);
  //initialise output array [src,dst]
  if (mac !== "") {
    if (key == "srcMAC") return `ether src ${mac}`;
    if (key == "dstMAC") return `ether dst ${mac}`;
  }
  return "";
}
