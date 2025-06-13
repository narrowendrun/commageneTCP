import { MdOutlineContentCopy } from "react-icons/md";
import FiltersOutput from "./filterOutput";
export default function Output({optionsFlags, filters, setFilters}){
    return <>
    <div className="container outputContainer">
        <div id="bashContainer" className="container">
            <div className="row">
                <div className="commandContainer col commandColumn">
                    
                    <FiltersOutput optionsFlags={optionsFlags} filters={filters} setFilters={setFilters}/>
                </div>
                <div className="col-1 copyButton commandColumn"><MdOutlineContentCopy /></div>
            </div>
        </div>
        <br /><br />
        <div id="wiresharkContainer" className="container">
           <div className="row">
                <div className="commandContainer col commandColumn"><span>wireshark</span></div>
                <div className="col-1 copyButton commandColumn"><MdOutlineContentCopy /></div>
            </div>

        </div>
    </div>
    </>
}