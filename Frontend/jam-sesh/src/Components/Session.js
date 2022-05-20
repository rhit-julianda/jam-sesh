import React, { useState, useCallback, useEffect } from "react";
import useWebsocket from 'react-use-websocket';
import SessionInfo from "./SessionInfo";
import SessionView from "./SessionView";
import InstrumentPlayer from "./InstrumentPlayer";
import "./Styles/Session.css";

function Session({joinCode, username}){
    const [socketUrl, setSocketUrl] = useState("url");
    const [initiated, setInitiated] = useState(false);
    const [instruments, setInstruments] = useState([]);
    const [userLists, setUserLists] = useState([]);
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
            var msg = JSON.parse(lastJsonMessage);
            switch(msg.command) {
                case("seshInfo"):
                    setInstruments(msg.instruments);
                    setUserLists(msg.userLists);
                    setStartNote(msg.startNote);
                    setEndNote(msg.endNote);
                    break;
                case("playNote"):
                    break;
                case("stopNote"):
                    break;
                default:
                    console.error("Invalid JSON message received");
            }
        }
    }, [lastJsonMessage]);

    useEffect(() => {
        if (!initiated) {
            var msg = {
                command: "joinSesh",
                joinCode: {joinCode},
                username: {username}
            }
            sendJsonMessage(JSON.stringify(msg));
            setInitiated(true);
        }
    }, [initiated, joinCode, username, sendJsonMessage]);

    useEffect(() => {
        if (instrument !== "unselected") {
            setInstrumentPlayer(<InstrumentPlayer instrument={instrument} startNote={startNote} endNote={endNote}/>);
        } else {
            setInstrumentPlayer(<div/>);
        }
    }, [instrument, endNote, startNote]);
  
    return( 
        <div>
            <SessionInfo code={joinCode} username={username}/>
            <SessionView 
                instrumentList={instruments} 
                userLists={userLists} 
                setInstrument={() => { 
                    var instrumentSelect = document.getElementById("instrumentSelect");
                    setInstrument(instrumentSelect.options[instrumentSelect.selectedIndex].text);
                }} 
                sendMessage={sendMessage}/>
            {instrumentPlayer}
        </div>
    )
}

export default Session;


