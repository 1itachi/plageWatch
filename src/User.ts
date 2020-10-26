import { IUser } from "./IUser";

export abstract class User implements IUser {
    private readonly userID: string;
    private userName: string;
    private password: string;

    constructor(userID: string, userName: string, password: string) {
        this.userID = userID;
        this.userName = userName;
        this.password = password;
    }

    verifyPassword(password: string): boolean {
        return false;
    }

    getUserID(): string { return; }

    getUserName(): string { return; }

    changePassword(currPassword: string, newPassword: string): boolean {
        return false;
    }

    changeUserName(username: string, password: string): boolean {
        return false;
    }
}
