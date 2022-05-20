import React from "react";
import InstrumentView from "./InstrumentView.js"
import "./Styles/SessionView.css"

function SessionView({ instrumentList, userLists, setInstrument, sendMessage }) {
    const children = instrumentList.map((val, i) => (
              <InstrumentView key={String(i)}
                instrument={val} 
                userList={userLists[i]}
              />
    ));
    return (
        <div id="sessionView">
            {children}
            <h3>Select your instrument:</h3>
            <select id="instrumentSelect" onChange={setInstrument} style={{width:200}}>
                <option>unselected</option>
                <option>acoustic_grand_piano</option>
                <option>violin</option>
            </select>
        </div>
    )
}

export default SessionView;