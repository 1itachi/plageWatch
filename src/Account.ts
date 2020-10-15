import { IUser } from "./IUser";


//not used anywhere
export class Account {
    constructor() {
    }

    register(user: IUser): void {
        throw new Error("Method not implemented.");
    }

    login(user: IUser): boolean {
        throw new Error("Method not implemented.");
    }

    logout(user: IUser): void {
        throw new Error("Method not implemented.");
    }

    deleteAccount(user: IUser): void {
        throw new Error("Method not implemented.");
    }
}