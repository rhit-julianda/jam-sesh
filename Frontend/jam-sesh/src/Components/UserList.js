import React from "react";

class UserList extends React.Component{
    constructor(){
        super();
        this.users = [{name:'A'}, {name:'B'}, {name:'C'}];
        this.addUser('D');
        this.removeUser('C');
    }

    render() {
        return(
            <div>
            <h1>Users:</h1>
            {this.users.map((user) => (
            <p>{user.name}</p>
            ))}
            </div>
        )
    }

    addUser(username){
        this.users.push({name: username});
    }
    removeUser(username){
        var ind = -1;
        var count=0
        for(count=0; count<this.users.length; count++){
            if(this.users[count].name==username){
                ind=count;
                break;
            }
        }
        if(ind>=0){
            this.users.splice(ind, 1);
        }
    }
}

export default UserList;