import TitleBar from './TitleBar';
import './Styles/Home.css';
import React from 'react';

function Home(){

    return (
    <div>
        <TitleBar />
        <h1>Home</h1>
        <p> 
            Username: &emsp;
            <input
                type="text"
                id="usernameInput"
            />
            &emsp;Join Code:&emsp;
            <input
                type="text"
                id="joinCodeInput"
                readOnly = {false}
            />
            <button id="joinButton" onClick={goToSesh}>Join</button>
        </p>
    </div>
    );
}

var goToSesh = function() {
    var joinCodeInput = document.getElementById("joinCodeInput");
    var usernameInput = document.getElementById("usernameInput");
    if (usernameInput.value !== "" && joinCodeInput.value !== "") {
        window.location.href = String("/sesh/?joinCode="+joinCodeInput.value+"&username="+usernameInput.value);
    }
}

export default Home;