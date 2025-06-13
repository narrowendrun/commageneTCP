import FilterToggleButton from "./filterToggleButton";

export default function Layer3({setFilters}){
    return <>
    <FilterToggleButton filterName={"ICMPv4"} filter={"icmp"} setFilters={setFilters}/>
    <FilterToggleButton filterName={"ICMPv6"} filter={"icmp6"} setFilters={setFilters}/>
    </>
}