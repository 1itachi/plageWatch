interface IUser {
    userID: string
    userName: string
    password: string

    getUserId(): string;
    getUserName(): string;
    verifyPassword(password: string): boolean;
    changePassword(currPassword: string, newPassword: string): boolean;
}
