import FilterButton from "./filterButton";
import IPparamButtons from "./paramIPbuttons";
export default function ({ dispatch }) {
  return (
    <>
      <FilterButton title="ICMPv4" protocol="icmp" dispatch={dispatch} />
      <FilterButton title="ICMPv6" protocol="icmp6" dispatch={dispatch} />
      <IPparamButtons dispatch={dispatch} />
    </>
  );
}
