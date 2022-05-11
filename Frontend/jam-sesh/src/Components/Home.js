import TitleBar from './TitleBar'
import PianoView from './PianoView';
import './Styles/Home.css'
import React from 'react';

class Home extends React.Component{
  constructor(){
    super();
    this.target = "";
  }

  changeTarget(e){
    this.target = e;
  }

  render(){
    return (
      <div>
      	<TitleBar />
      	<h1>Home</h1>
        <p> Join Code: {'  '}
        <input
            type="text"
            id="joinCodeInput"
            onChange={(text) => this.changeTarget(text)}
            readOnly = {false}
         /> {'      '}
        <button>Join</button>
         </p>
         <p></p>
      </div>
    );
  }
}

export default Home;