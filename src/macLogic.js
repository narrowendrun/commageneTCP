export function macLogic(key, value) {
  // mac is the cleaned list of bytes
  // mac1 and mac2 are formatted hex values for UDP filters
  let mac = [];
  let mac1 = "";
  let mac2 = "";

  if (value !== "" && !value.includes(" ")) {
    const hexOnly = value.replace(/[^0-9A-Fa-f]/g, "");

    // Handle full 12-character hex format (valid after removing all separators)
    if (hexOnly.length === 12) {
      mac = hexOnly.match(/.{1,2}/g); // Split into 6 bytes
      mac1 = "0x" + mac.slice(0, 4).join("");
      mac2 = "0x" + mac.slice(4, 6).join("");
    }

    // Handle dot notation like a.b.c or dead.beef.cafe
    else if (value.includes(".")) {
      const parts = value.split(".").filter((p) => p.trim() !== "");
      if (
        parts.length === 3 &&
        parts.every((p) => /^[0-9A-Fa-f]{1,4}$/.test(p))
      ) {
        // Pad each part to 4 characters
        let hex = "";
        for (let part of parts) {
          hex += part.padStart(4, "0");
        }
        if (hex.length === 12) {
          mac = hex.match(/.{1,2}/g);
          mac1 = "0x" + mac.slice(0, 4).join("");
          mac2 = "0x" + mac.slice(4, 6).join("");
        } else {
          return "invalid mac";
        }
      } else {
        return "invalid mac";
      }
    }

    // If after all parsing, MAC isn't valid
    if (mac.length !== 6 || mac.join("").length !== 12) {
      return "invalid mac";
    }

    // Respond based on key
    if (key === "outermac") {
      return mac.join(":");
    }
    if (key === "innerSrcMAC")
      return `udp[22:4] = ${mac1} and udp[26:2] = ${mac2}`;
    if (key === "innerDstMAC")
      return `udp[16:4] = ${mac1} and udp[20:2] = ${mac2}`;
  } else {
    return `invalid MAC address`;
  }
}

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
