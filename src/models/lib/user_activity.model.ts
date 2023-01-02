export interface IUserActivity {
    activity: string;
    date: Date;
    moduleName: string;
    userId: number;
    userName: string;
}

export class UserActivityModel implements IUserActivity {
    public activity: string;
    public date: Date;
    public moduleName: string;
    public userId: number;
    public userName: string;

    constructor(user: any, moduleName: string, activity: string) {
        this.userId = user.userSysId || user.userId || user.userId;
        this.userName = user.userName || user.firstName || null;
        this.moduleName = moduleName;
        this.activity = activity;
        this.date = new Date();
    }
}
