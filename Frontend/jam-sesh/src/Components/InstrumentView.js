import React from "react";
import Instrument from "./Instrument";
import "./Styles/InstrumentView.css";

function InstrumentView({instrument, userList, instrumentID, myID, joinFunction}) {
    let button;
    if(instrumentID === myID){
        button = <button style={{width: 200}} onClick={() => joinFunction(instrumentID)}>Leave</button>
    }
    else{
        button = <button style={{width: 200}} onClick={() => joinFunction(instrumentID)}>Join</button>
    }
    return (
        <div id='viewBox'>
            <h1>Players: {userList.join(", ")}</h1>
            <div>
            	{button}
            </div>
            <div>
                <Instrument start='c4' end='g6' instrument={instrument} playable={false}/>
            </div>
        </div>
    )
}

export default InstrumentView;
