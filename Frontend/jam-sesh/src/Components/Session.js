import PianoView from "./PianoView";
import UserList from "./UserList";

class Session{
  constructor(props){
    this.joinCode = props.code;
  }

  render(){
  return (
      <div>
      <PianoView />
      <p>
      <h1>Session</h1>
      <h1>Join Code: {this.joinCode}</h1>
      </p>
      <UserList />
      </div>
  );
  }
}

export default Session;


