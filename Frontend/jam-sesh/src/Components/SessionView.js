import React, { useState, useCallback, useEffect } from "react";
import InstrumentView from "./InstrumentView.js"
import "./Styles/SessionView.css"
import SoundfontProvider from './SoundfontProvider.js';

function SessionView({ instrumentList, myInstrumentID, setInstrument, sendMessage }) {
    
    function joinLeave(id){
        sendMessage({command:"JOIN", instrumentID:id});
    }

    function create(){
        let instrumentSelect = document.getElementById("instrumentSelect");
        sendMessage({command:"CREATE",type: instrumentSelect.options[instrumentSelect.selectedIndex].text});
    }
    
    const children = instrumentList.map((val, i) => (

              <InstrumentView key={String(i)}
                instrument={val.type} 
                userList={val.users}
                instrumentID={val.instrumentID}
                joinFunction = {(id) => joinLeave(id)}
              />
    ));
    return (
        <div id="sessionView">
            {children}
            <h3>Select your instrument:</h3>
            <select id="instrumentSelect" style={{width:200}}>
                <option>unselected</option>
                <option>acoustic_grand_piano</option>
                <option>violin</option>
                <option>electric_guitar_clean</option>
                <option>xylophone</option>
                <option>banjo</option>
                <option>ocarina</option>
                <option>soprano_sax</option>
                <option>tuba</option>
                <option>marimba</option>
                <option>glockenspiel</option>
            </select>
            <button onClick={create} style={{width:200}}>Create</button>
        </div>
    )
}

export default SessionView;
