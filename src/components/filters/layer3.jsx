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
    </>
  );
}
