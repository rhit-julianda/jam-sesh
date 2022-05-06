class UserList{
    constructor(){
        var users = [];
    }

    render() {
        return(
            <div>
            <h1>Users:</h1>
            <ul>
            {users.map((user) => (
            <li>{user}</li>
            ))}
            </ul>
            </div>
        )
    }

    addUser(username){
        users.add(username);
    }
}