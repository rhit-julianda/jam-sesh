class UserList{
    constructor(){
        this.users = [];
    }

    render() {
        return(
            <div>
            <h1>Users:</h1>
            <ul>
            {this.users.map((user) => (
            <li>{user}</li>
            ))}
            </ul>
            </div>
        )
    }

    addUser(username){
        this.users.add(username);
    }
}

export default UserList;