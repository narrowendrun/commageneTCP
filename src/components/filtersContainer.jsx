import Layer2 from "./filters/layer2";
import Layer3 from "./filters/layer3";
import Layer4 from "./filters/layer4";

export default function FiltersContainer({setFilters}){
    return <>
    <div className="container section">
        <h2 id="filtersHeader"
        >
          Filters
        </h2>
        <div className="row">
            <div className="optionsColumn col">
                <h4>Layer 2</h4>
                <Layer2 setFilters={setFilters}/>
            </div>
            <div className="optionsColumn col">
                <h4>Layer 3</h4>
                <Layer3 setFilters={setFilters}/>
                
            </div>
            <div className="optionsColumn col">
                <h4>Layer 4+</h4>
                <Layer4 setFilters={setFilters}/>
            </div>
        </div>
    </div>  
    </>
}