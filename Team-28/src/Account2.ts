import { IUser } from "./IUser";
//not used anywhere
export class Account {
    constructor() { }

    register(user: IUser): void { }

    login(user: IUser): boolean { return; }

    logout(user: IUser): void { }

    deleteAccount(user: IUser): void { }
}
