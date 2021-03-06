import * as moment from 'moment';
import { Sensor, SensorPreferences, User, Issue, EndpointIssue, StatusCheck, CommentCategory, DeviceToken, SeriePoint, RegisterForm, View, Team } from './models';
export * from './models';
export declare type TokenRes = {
    token?: string;
    message?: string;
};
export declare const filterUp: (items: Sensor[]) => Sensor[];
export declare const filterDown: (items: Sensor[]) => Sensor[];
export default class Sdk {
    url: string;
    token: string;
    private tokenExpiredCb;
    constructor(url: string);
    onTokenExpired(cb: () => void): void;
    resHandler(res: Response): any;
    setToken: (token: string) => void;
    login: (user: string, password: string) => Promise<TokenRes>;
    createHeaders: (token: string) => {
        'Authorization': string;
        'Content-Type': string;
    };
    createMode: () => "cors" | "navigate";
    createPreferences: (preferences: SensorPreferences) => Promise<Response>;
    updatePreSensorferences: (preferences: SensorPreferences) => Promise<Response>;
    updateUser: (user: User) => Promise<User>;
    getUser: (userId: string) => Promise<User>;
    comments: (issueId: number) => Promise<Comment[]>;
    sensors: (viewId: number) => Promise<Sensor[]>;
    endpointIssue: (endpointId: number) => Promise<EndpointIssue>;
    sensorCheck: (id: number) => Promise<StatusCheck>;
    issues: (viewId: number, stat: string) => Promise<Issue[]>;
    updateIssue: (issue: Issue) => Promise<Response>;
    updateEndpointIssue: (endpointIssue: EndpointIssue) => Promise<Response>;
    sensorsPreferences: () => Promise<SensorPreferences[]>;
    commentCategories: () => Promise<CommentCategory[]>;
    users: () => Promise<User[]>;
    owners: (userId: number) => Promise<User[]>;
    createDeviceToken: (device: string, type: "IOS" | "ANDROID") => Promise<DeviceToken>;
    updatePreferences: (preferences: SensorPreferences) => Promise<Response>;
    getSeries: (id: number, start: moment.Moment, stop: moment.Moment) => Promise<SeriePoint[]>;
    register: (userForm: RegisterForm) => Promise<User>;
    createOwner: (sensorId: number, userId: number) => Promise<User>;
    createComment: (issueId: number, categoryId: number, content: string) => Promise<any>;
    views: () => Promise<View[]>;
    view: (id: number) => Promise<View>;
    viewsByTeam: (teamId: number) => Promise<View[]>;
    memberTeams: (member: number) => Promise<Team[]>;
}
export declare const initSdk: (url: string) => Sdk;
export declare const getSdk: () => Sdk;
