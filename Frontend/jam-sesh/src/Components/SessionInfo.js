import React from "react";

function SessionInfo({code, username}) {
    return (
        <div>
            <h1>&emsp;JAM ON, {username}!</h1>
            <h2>&emsp;&emsp;Join Code: {code}</h2>
            <hr className="separator"></hr>
        </div>
    )
}

export default SessionInfo;