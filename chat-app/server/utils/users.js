class User {
    constructor(id, name, room) {
        this.id = id;
        this.name = name;
        this.room = room;
    }
}

class Users {
    constructor() {
        this.users = [];
    }

    addUser(user) {
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        let user = this.getUser(id);
        this.users = this.users.filter(user => user.id !== id);
        return user;
    }

    getUser(id) {
        return this.users.find(user => user.id === id);
    }

    getUserList(room) {
        let users = this.users.filter(user => user.room === room);
        return users.map(user => user.name);
    }
}

module.exports = {
    User,
    Users
};