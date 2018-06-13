const expect = require('expect');

const { User, Users } = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            new User('1', 'Mike', 'Room 1'),
            new User('2', 'Harvey', 'Room 2'),
            new User('3', 'Rachel', 'Room 1')
        ];
    });

    it('should add new user', () => {
        let users = new Users();
        let user = new User('123', 'Daniele', 'Some room');
        let result = users.addUser(user);

        expect(users.users).toEqual([user]);
    });

    it('should return names for users in room', () => {
        let userList = users.getUserList('Room 1');
        expect(userList).toEqual([ 'Mike', 'Rachel' ]);
    });

    it('should remove user', () => {
        let userToRemove = users.users[2];
        let removedUser = users.removeUser(userToRemove.id);
        expect(removedUser).toEqual(userToRemove);
    });

    it('should not remove user if user with id does not exist', () => {
        let removedUser = users.removeUser('badId');
        expect(removedUser).toBeFalsy();
    });

    it('should get user', () => {
        let userToGet = users.users[0];
        let user = users.getUser(userToGet.id);
        expect(user).toEqual(userToGet);
    });

    it('should not find user for invalid id', () => {
        let user = users.getUser('someBadId');
        expect(user).toBeFalsy();
    });
});