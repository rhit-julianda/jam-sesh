import PianoView from "./PianoView";
import UserList from "./UserList";
import React from "react";

class Session extends React.Component{
  constructor(props){
    super(props);
    this.joinCode = props.code;
    this.list = new UserList;
    this.list.addUser('E');
  }

  render(){
  return( 
  <div>
      <PianoView />
      <p>
      <h1>Session</h1>
      <h1>Join Code: {this.joinCode}</h1>
      </p>
      <div>{this.list.render()}</div>
      </div>
  )
  }
}

export default Session;


