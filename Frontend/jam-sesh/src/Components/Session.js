import React from "react";
import SessionInfo from "./SessionInfo";
import SessionView from "./SessionView";
import InstrumentPlayer from "./InstrumentPlayer";
import "./Styles/Session.css";

function Session({joinCode, userList}){
  
  return( 
    <div>
      <SessionInfo code={joinCode}/>
      <SessionView instrumentList={['acoustic_grand_piano', 'acoustic_grand_piano']} userLists={[['Joe', 'Jim'], ['Jack']]}/>
      <InstrumentPlayer instrument='viola' startNote='c4' endNote='g4'/>
      <h1>Session</h1>
      <h1>Join Code: {joinCode}</h1>
      <div>{userList}</div>
    </div>
  )
}

export default Session;


