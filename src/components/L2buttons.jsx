import FilterButton from "./filterButton";
import ParamButton from "./paramButton";
export default function L2buttons({ dispatch }) {
  return (
    <>
      <FilterButton title="ARP" protocol="arp" dispatch={dispatch} />
      <FilterButton
        title="LLDP"
        protocol="ether proto 0x8809"
        dispatch={dispatch}
      />
      <FilterButton
        title="LACP"
        protocol="ether proto 0x88cc"
        dispatch={dispatch}
      />
      <FilterButton title="PPPoE" protocol="pppoe" dispatch={dispatch} />

      <ParamButton dispatch={dispatch} />

      <div className="col-md filter"></div>
    </>
  );
}
