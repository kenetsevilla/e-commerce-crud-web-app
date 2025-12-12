class User {
    static users = JSON.parse(localStorage.getItem('users')) || [];
    static loggedInAccount;

    constructor(userID, name, email, password, address, phoneNumber, role = 'user') {
        if (!['admin', 'user'].includes(role)) {
            throw new Error("Role must be either 'admin' or 'user'.");
        }

        this.userID = userID;
        this.name = name;
        this.email = email;
        this.password = password;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.role = role;
    }

    static generateUserID() {
        let userID;
        do {
            userID = Math.floor(Math.random() * 1000000);
        } while (User.users.find(user => user.userID === userID));
        return userID;
    }

    static saveUsersToStorage() {
        localStorage.setItem('users', JSON.stringify(User.users));
    }

    static createUser(name, email, password, address, phoneNumber, role = 'user') {
        const existingUser = User.users.find(user => user.email === email || user.phoneNumber === phoneNumber);
        if (existingUser) {
            throw new Error('User with this email or phone number already exists.');
        }
    
        const userID = User.generateUserID();
        const newUser = new User(userID, name, email, password, address, phoneNumber, role);
        User.users.push(newUser);
        this.saveUsersToStorage();
        return newUser;
    }    

    static getUserByID(userID) {
        const user = User.users.find(user => user.userID === userID);
        if (!user) {
            throw new Error('User not found.');
        }
        return user;
    }

    static getUserByEmail(email) {
        const user = User.users.find(user => user.email === email);
        if (!user) {
            throw new Error('User not found.');
        }
        return user;
    }

    static updateUserRoleByEmail(email, newRole) {
        if (!['admin', 'user'].includes(newRole)) {
            throw new Error("Role must be either 'admin' or 'user'.");
        }
        const user = User.users.find(user => user.email === email);
        if (!user) {
            throw new Error('User not found.');
        }
        user.role = newRole;
        this.saveUsersToStorage();
        return user;
    }

    static getAllUsers() {
        return User.users;
    }

    static updateUser(userID, updatedDetails) {
        const user = User.getUserByID(userID);
        for (const key in updatedDetails) {
            if (user[key] !== undefined && key !== 'userID') {
                user[key] = updatedDetails[key];
            }
        }
        this.saveUsersToStorage();
        return user;
    }

    static deleteUser(userID) {
        const userIndex = User.users.findIndex(user => user.userID === userID);
        if (userIndex === -1) {
            throw new Error('User not found.');
        }
        const deletedUser = User.users.splice(userIndex, 1)[0];
        this.saveUsersToStorage();
        return deletedUser;
    }

    static getLoggedInAcc() {
        const account = localStorage.getItem('loggedInAccount');
        return account ? JSON.parse(account) : null;
    }

    static setLoggedInAcc(account) {
        if (account) {
            localStorage.setItem('loggedInAccount', JSON.stringify(account));
        } else {
            localStorage.removeItem('loggedInAccount');
        }
    }

    static deleteAllUsersByRole(role) {
        const usersToDelete = User.users.filter(user => user.role === role);
        if (usersToDelete.length === 0) {
            throw new Error('No users found with the specified role.');
        }

        User.users = User.users.filter(user => user.role !== role);

        this.saveUsersToStorage();

        return usersToDelete;
    }
}

export default User;
