import { User } from "./User2";

export class Instructor extends User {

    private emailAddress: string;

    constructor(userID: string, userName: string,
        password: string, emailAddress: string) {
        super(userID, userName, password)
        this.emailAddress = emailAddress;
    }

    getEmailAddress(): string { return; }
}
