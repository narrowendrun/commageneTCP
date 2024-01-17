import FilterButton from "./filterButton";
import PortparamButtons from "./paramPortButtons";
export default function L4pbuttons({ dispatch }) {
  return (
    <>
      <FilterButton title="NTP" protocol="udp port 123" dispatch={dispatch} />
      <FilterButton
        title="OSPFv2"
        protocol="'(ip[9]==89)'"
        dispatch={dispatch}
      />

      <FilterButton
        title="OSPFv3"
        protocol="ip6 proto 0x59"
        dispatch={dispatch}
      />
      <FilterButton title="BGP" protocol="tcp port 179" dispatch={dispatch} />
      <FilterButton
        title="DHCP"
        protocol="'(udp port 67 or udp port 68)'"
        dispatch={dispatch}
      />
      <PortparamButtons dispatch={dispatch} />
    </>
  );
}
