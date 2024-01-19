import { VLANlogic } from "./VLAN";
import { MACLogic } from "./MAC";
import * as VXLAN from "./VXLAN";

export function applyLogic(key, value) {
  if (key == "VLAN") return VLANlogic(value);
  if (key == "srcMAC" || key == "dstMAC") return MACLogic(key, value);
  // if (key == "srcMAC") return MACLogic(value, textVal.dstMAC);
  // if (key == "dstMAC") return MACLogic(textVal.srcMAC, value);
  if (key == "innerSrcIP" || key == "innerDstIP")
    return VXLAN.IP_Logic(key, value);
  if (key == "innerSrcMAC" || key == "innerDstMAC")
    return VXLAN.MAC_Logic(key, value);
  if (key == "VNI") return VXLAN.VNI_LOGIC(value);
}
