import React from "react";
import InstrumentView from "./InstrumentView.js"
import "./Styles/SessionView.css"

var createInstrument = function() {
    console.log("Create a new instrument");
}

function SessionView({ instrumentList, userLists }) {
    const children = instrumentList.map((val, i) => (
              <InstrumentView key={String(i)}
                instrument={val} 
                userList={userLists[i]}
              />
    ));
    return (
        <div id="sessionView">
            {children}
            <button style={{width: 200}} onClick={createInstrument}>New Instrument</button>
        </div>
    )
}

export default SessionView;