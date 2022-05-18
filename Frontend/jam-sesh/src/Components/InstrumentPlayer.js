import React from "react";
import Instrument from "./Instrument";

var leaveInstrument = function() {
    console.log("Leave instrument");
}

function InstrumentPlayer({instrument, startNote, endNote}) {
    return (
        <div id='viewBox'>
            <h1>Your Instrument</h1>
            <div>
                <Instrument start={startNote} end={endNote} instrument={instrument} playable={true}/>
            </div>
            <button onClick={leaveInstrument}>Leave this instrument</button>
        </div>
    )
}

export default InstrumentPlayer;