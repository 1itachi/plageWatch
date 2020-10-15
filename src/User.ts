import { IUser } from "./IUser";

//did you mean this to be abstract class or class?
export abstract class User implements IUser {
    private readonly userID: string;
    private userName: string;
    private password: string;

    constructor(userID: string, userName: string, password: string) {
        this.userID = userID;
        this.userName = userName;
        this.password = password;
    }

    getUserID(): string {
        return this.userID;
    }

    getUserName(): string {
        return this.userName;
    }

    verifyPassword(password: string): boolean {
        if (this.password === password) {
            return true;
        }
        else {
            return false;
        }
    }

    changeUserName(username: string, password: string): boolean {
        if (this.password === password) {
            this.userName = username;
            return true;
        }
        else {
            return false;
        }
    }

    changePassword(currPassword: string, newPassword: string): boolean {
        if (this.password === currPassword) {
            this.password = newPassword;
            return true;
        }
        else {
            return false;
        }
    }
}
