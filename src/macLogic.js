export function macLogic(key, value) {
  // mac is the cleaned list of bytes
  // mac1 and mac2 are formatted hex values for UDP filters
  let mac = [];
  let mac1 = "";
  let mac2 = "";

  if (value !== "" && !value.includes(" ")) {
    const hexOnly = value.replace(/[^0-9A-Fa-f]/g, '');

    // Handle full 12-character hex format (valid after removing all separators)
    if (hexOnly.length === 12) {
      mac = hexOnly.match(/.{1,2}/g); // Split into 6 bytes
      mac1 = "0x" + mac.slice(0, 4).join("");
      mac2 = "0x" + mac.slice(4, 6).join("");
    }

    // Handle dot notation like a.b.c or dead.beef.cafe
    else if (value.includes('.')) {
      const parts = value.split('.').filter(p => p.trim() !== '');
      if (parts.length === 3 && parts.every(p => /^[0-9A-Fa-f]{1,4}$/.test(p))) {
        // Pad each part to 4 characters
        let hex = '';
        for (let part of parts) {
          hex += part.padStart(4, '0');
        }
        if (hex.length === 12) {
          mac = hex.match(/.{1,2}/g);
          mac1 = "0x" + mac.slice(0, 4).join("");
          mac2 = "0x" + mac.slice(4, 6).join("");
        } else {
          return 'invalid mac';
        }
      } else {
        return 'invalid mac';
      }
    }

    // If after all parsing, MAC isn't valid
    if (mac.length !== 6 || mac.join('').length !== 12) {
      return 'invalid mac';
    }

    // Respond based on key
    if (key === "outermac") return mac;
    if (key === "innerSrcMAC")
      return `udp[22:4] = ${mac1} and udp[26:2] = ${mac2}`;
    if (key === "innerDstMAC")
      return `udp[16:4] = ${mac1} and udp[20:2] = ${mac2}`;
  } else {
    return `invalid MAC address`;
  }
}
