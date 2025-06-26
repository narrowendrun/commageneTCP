import FilterToggleButton from "./filterToggleButton";

export default function Layer4({ setFilters }) {
  return (
    <>
      <FilterToggleButton
        filterName={"NTP"}
        filter={"udp port 123"}
        setFilters={setFilters}
      />
      <FilterToggleButton
        filterName={"OSPFv2"}
        filter={"'(ip[9]==89)'"}
        setFilters={setFilters}
      />
      <FilterToggleButton
        filterName={"OSPFv3"}
        filter={"ip6 proto 0x59"}
        setFilters={setFilters}
      />
      <FilterToggleButton
        filterName={"BGP"}
        filter={"tcp port 179"}
        setFilters={setFilters}
      />
      <FilterToggleButton
        filterName={"DHCP"}
        filter={"'(udp port 67 or udp port 68)'"}
        setFilters={setFilters}
      />
      <FilterToggleButton
        filterName={"UDP"}
        filter={"udp"}
        setFilters={setFilters}
        andor={true}
        edit={true}
      />
      <FilterToggleButton
        filterName={"TCP"}
        filter={"tcp"}
        setFilters={setFilters}
        andor={true}
        edit={true}
      />
      <FilterToggleButton
        filterName={"ISIS"}
        filter={"ether proto 0x22f0"}
        setFilters={setFilters}
      />
      <FilterToggleButton
        filterName={"LDP"}
        filter={"port 646"}
        setFilters={setFilters}
      />
    </>
  );
}
