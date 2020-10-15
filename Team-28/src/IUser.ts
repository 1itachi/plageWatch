export interface IUser {
    getUserID(): string;
    getUserName(): string;
    verifyPassword(password: string): boolean;
    changeUserName(username: string, password: string): boolean;
    changePassword(currPassword: string, newPassword: string): boolean;
}
