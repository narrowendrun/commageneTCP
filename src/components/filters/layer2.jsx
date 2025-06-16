import FilterToggleButton from "./filterToggleButton";

export default function Layer2({setFilters}){
    return <>
    <FilterToggleButton filterName={"ARP"} filter={"arp"} setFilters={setFilters} andor={false}/>
    <FilterToggleButton filterName={"LLDP"} filter={"ether proto 0x88cc"} setFilters={setFilters} andor={false}/>
    <FilterToggleButton filterName={"LACP"} filter={"ether proto 0x8809"} setFilters={setFilters} andor={false}/> 
    <FilterToggleButton filterName={"PPPoE"} filter={"pppoe"} setFilters={setFilters} andor={false}/> 
    <FilterToggleButton filterName={"MAC"} filter={"ether mac"} setFilters={setFilters} andor={true} edit={true}/>
    <FilterToggleButton filterName={"VLAN"} filter={"vlan"} setFilters={setFilters} andor={true} edit={true}/> 
    <FilterToggleButton filterName={"VXLAN"} filter={"vxlan"} setFilters={setFilters} andor={true} edit={true}/> 
    </>
}