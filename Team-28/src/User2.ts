import { IUser } from "./IUser";

// Made the classes with method stubs to follow report specs.
export abstract class User implements IUser {
    private readonly userID: string;
    private userName: string;
    private password: string;

    constructor(userID: string, userName: string, password: string) {
        this.userID = userID;
        this.userName = userName;
        this.password = password;
    }

    getUserID(): string { return; }

    getUserName(): string { return; }

    verifyPassword(password: string): boolean {
        return false;
    }

    changeUserName(username: string, password: string): boolean {
        return false;
    }

    changePassword(currPassword: string, newPassword: string): boolean {
        return false;
    }
}
