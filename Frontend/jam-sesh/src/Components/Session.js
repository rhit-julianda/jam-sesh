import React, { useState, useCallback, useEffect } from "react";
import useWebsocket from 'react-use-websocket';
import SessionInfo from "./SessionInfo";
import SessionView from "./SessionView";
import InstrumentPlayer from "./InstrumentPlayer";
import "./Styles/Session.css";
import Soundfont from 'soundfont-player';

function Session(){
	
    const backendpath = "ws://localhost:8765";

    let urlsParams = new URLSearchParams(window.location.search);
    const joinCode = urlsParams.get("joinCode");
    const username = urlsParams.get("username");
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';
 
    const [socketUrl, setSocketUrl] = useState(String(backendpath + "/" + joinCode));
    const [initiated, setInitiated] = useState(false);
    const [instruments, setInstruments] = useState([]);
    const [instrumentIDs, setInstrumentIDs] = useState({});
    const [instrumentID, setInstrumentID] = useState(-1);
    const [startNote, setStartNote] = useState("c4");
    const [endNote, setEndNote] = useState("g6");
    const [instrument, setInstrument] = useState("unselected");
    const [instrumentPlayer, setInstrumentPlayer] = useState(<div></div>);
    const keys = ["c4", "c#4", "d4", "d#4", "e4", "f4", "f#4", "g4", "g#4", "a4", "a#4", "b4",
                  "c5", "c#5", "d5", "d#5", "e5", "f5", "f#5", "g5", "g#5", "a5", "a#5", "b5",
                  "c6", "c#6", "d6", "d#6", "e6", "f6", "f#6", "g6"];
    const { sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState } = useWebsocket(socketUrl);

    useEffect(() => {
        if (lastJsonMessage != null) {
            let msg = lastJsonMessage;
            
            switch(lastJsonMessage.command) {
                case("SESSION_INFO"):
                    setInstruments(msg.instruments);
                    setInstrumentID(msg.instrumentID);
                    setStartNote(keys[msg.start]);
                    setEndNote(keys[msg.end]);
                    let ids = {}
                    for (const instrument of msg.instruments){
                        ids[instrument.instrumentID] = instrument;
                    }
                    setInstrumentIDs(ids);
                    break;
                case("NOTE"):
                    let instrument = instrumentIDs[msg.instrumentID];
                    if(msg.play == "True"){
                        Soundfont.instrument(new AudioContext(), instrument.type).then(function (ins) {ins.play(msg.note); instrument[msg.note]=ins;});
                    }
                    else{
                        if(instrument[msg.note] !== undefined){
                        	instrument[msg.note].stop();
                        }
                    }
                    break;
                default:
                    console.error("Bad Json");
            }
        }
    }, [lastJsonMessage]);

    useEffect(() => {
        if (!initiated) {
            let msg = {
                command: "NAME",
                name: username
            }
            sendJsonMessage(msg);
            setInitiated(true);
        }
    }, [initiated, username, sendJsonMessage]);

    useEffect(() => {
        if (instrumentID !== -1) {
            setInstrumentPlayer(<InstrumentPlayer instrument={instrumentIDs[instrumentID].type} startNote={startNote} endNote={endNote} sendMessage={sendJsonMessage}/>);
        } else {
            setInstrumentPlayer(<div/>);
        }
    }, [instrumentID, instrumentIDs, endNote, startNote]);
  
    return( 
        <div>
            <SessionInfo code={joinCode} username={username}/>
            <SessionView 
                instrumentList={instruments}
                instrumentID={instrumentID}
                setInstrument={() => { 
                    var instrumentSelect = document.getElementById("instrumentSelect");
                    setInstrument(instrumentSelect.options[instrumentSelect.selectedIndex].text);
                }} 
                sendMessage={sendJsonMessage}/>
            {instrumentPlayer}
        </div>
    )
}

export default Session;


