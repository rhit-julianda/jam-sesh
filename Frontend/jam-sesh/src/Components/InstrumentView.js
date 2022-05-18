import React from "react";
import Instrument from "./Instrument";
import "./Styles/InstrumentView.css";

var joinInstrument = function() {
    console.log("Join me");
}

function InstrumentView({instrument, userList}) {
    return (
        <div id='viewBox'>
            <h1>Players: {userList.join(", ")}</h1>
            <div>
                <button style={{width: 200}} onClick={joinInstrument}>Join</button>
            </div>
            <div>
                <Instrument start='c4' end='g6' instrument={instrument} playable={false}/>
            </div>
        </div>
    )
}

export default InstrumentView;