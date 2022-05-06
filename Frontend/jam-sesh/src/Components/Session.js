import PianoView from "./PianoView";
import UserList from "./UserList";

class Session{
  constructor(code){
    const joinCode = code;
  }

  render(){
  return (
      <div>
      <PianoView></PianoView>
      <p>
      <h1>Session</h1>
      <h1>Join Code: {joinCode}</h1>
      </p>
      <UserList></UserList>
      </div>
  );
  }
}


