export interface IUser {
    verifyPassword(password: string): boolean;
    getUserID(): string;
    getUserName(): string;
    changeUserName(username: string, password: string): boolean;
    changePassword(currPassword: string, newPassword: string): boolean;
}
