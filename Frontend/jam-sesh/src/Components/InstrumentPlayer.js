import React from "react";
import MuteInstrument from "./MuteInstrument";

function InstrumentPlayer({instrument, startNote, endNote, sendMessage}) {
    
    return (
        <div id='viewBox'>
            <h1>Your Instrument</h1>
            <div>
                <MuteInstrument start={startNote} end={endNote} instrument={instrument} playable={true} sendMessage={sendMessage}/>
            </div>
            <button onClick={() => sendMessage({command:"LEAVE"})}>Leave this instrument</button>
        </div>
    )
}

export default InstrumentPlayer;
