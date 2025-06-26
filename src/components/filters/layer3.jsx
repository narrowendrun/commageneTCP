import FilterToggleButton from "./filterToggleButton";

export default function Layer3({ setFilters }) {
  return (
    <>
      <FilterToggleButton
        filterName={"ICMPv4"}
        filter={"icmp"}
        setFilters={setFilters}
      />
      <FilterToggleButton
        filterName={"ICMPv6"}
        filter={"icmp6"}
        setFilters={setFilters}
      />
      <FilterToggleButton
        filterName={"IPv4"}
        filter={"ip"}
        setFilters={setFilters}
        andor={true}
        edit={true}
      />
      <FilterToggleButton
        filterName={"IPv6"}
        filter={"ip6"}
        setFilters={setFilters}
        andor={true}
        edit={true}
      />
      <FilterToggleButton
        filterName={"PIM"}
        filter={"ip proto 103"}
        setFilters={setFilters}
      />
    </>
  );
}
