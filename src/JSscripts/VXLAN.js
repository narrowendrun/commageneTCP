function IPtoHEX(ip) {
  if (ip == "" || ip.includes(" ")) return false;
  if (!ip.includes(" ")) {
    //splitting the ipv4 string into octets and storing them in an array
    let arr = ip.split(".");
    arr = arr
      .filter((element) => element.trim() !== "")
      .map((i) => parseInt(i));
    //validating if array has 4 legit values and converting each element to hex
    if (arr.length == 4) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == NaN || arr[i] > 255) return `invalid ip`;
        //convert each value to hex
        let temp = arr[i].toString(16);
        if (temp.length == 1) {
          arr[i] = `0${temp}`;
        } else {
          arr[i] = temp;
        }
      }
      return "0x" + arr.join("");
    }
  }
  return "invalid ip";
}
export function IP_Logic(key, value) {
  let ip = IPtoHEX(value);
  if (ip) {
    if (key == "innerSrcIP") return `udp[42:4] = ${ip}`;
    if (key == "innerDstIP") return `udp[46:4] = ${ip}`;
  }
  return "";
}
export function MAC_Logic(key, value) {
  //mac is the input value
  //mac1 and mac2 are the values to be placed in the udp header
  let mac = "";
  let mac1 = "";
  let mac2 = "";
  if (value !== "" && !value.includes(" ")) {
    //logic for colonated MAC addresses
    if (value.includes(":")) {
      mac = value.split(":").filter((element) => element.trim() !== "");
      let _mac = mac.join("");
      //validating if input string has 6 colonated values and 12 characters in total
      if (mac.length == 6 && _mac.length == 12) {
        mac1 = "0x" + mac.slice(0, 4).join("");
        mac2 = "0x" + mac.slice(4, 6).join("");
      } else {
        return `invalid mac`;
      }
      //logic for hyphenated MAC addresses
    } else if (value.includes("-")) {
      mac = value.split("-").filter((element) => element.trim() !== "");
      let _mac = mac.join("");
      //validating if input string has 6 colonated values and 12 characters in total
      if (mac.length == 6 && _mac.length == 12) {
        mac1 = "0x" + mac.slice(0, 4).join("");
        mac2 = "0x" + mac.slice(4, 6).join("");
      } else {
        return `invalid mac`;
      }
    } else if (value.includes(".")) {
      mac = value.split(".").filter((element) => element.trim() !== "");
      if (mac.length !== 3) {
        return `invalid mac`;
      }
      for (let i = 0; i < mac.length; i++) {
        if (mac[i].length < 4) {
          let temp = mac[i];
          mac[i] = "0".repeat(4 - mac[i].length) + temp;
        }
      }
      mac1 = "0x" + mac.slice(0, 2).join("");
      mac2 = "0x" + mac.slice(2, 3).join("");
    }
    //sending the right values according to selection
    if (key == "outermac") return mac;
    if (key == "innerSrcMAC")
      return `udp[22:4] = ${mac1} and udp[26:2] = ${mac2}`;
    if (key == "innerDstMAC")
      return `udp[16:4] = ${mac1} and udp[20:2] = ${mac2}`;
  } else {
    return ``;
  }
}
export function VNI_LOGIC(value) {
  if (value !== "" && !value.includes(" ")) return `udp[11:4] = ${value}`;
  return ``;
}
