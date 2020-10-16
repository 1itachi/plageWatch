import { IUser } from "./IUser";

export class Account {
    constructor() { }

    register(user: IUser): void { }
    login(user: IUser): boolean { return; }
    logout(user: IUser): void { }
    deleteAccount(user: IUser): void { }
}
