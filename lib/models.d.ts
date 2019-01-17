export declare type Token = string;
export declare const DOMAIN = 0;
export declare const APP = 1;
export declare const SENSOR = 2;
export declare type Status = 'OK' | 'KO' | 'HANDLED';
export declare type Issue = {
    id: number;
    status: 'OPEN' | 'CLOSED';
    createdAt: string;
    resolvedAt: string;
    endpoints: number[];
    sensorId: number;
    endpointsInfo: EndpointIssue[];
};
export declare type EndpointIssue = {
    id: number;
    body: string;
    createdAt: string;
    responsibleId: number | null;
    sensorId: number;
    statusCode: number;
    updatedAt: string;
};
export declare type Group = {
    id: number;
    name: string;
    sensors: number[];
};
export declare type Statistics = {
    day: number;
    week: number;
    month: number;
    latency: number;
};
export declare type SensorType = 0 | 1 | 2;
export declare type Sensor = {
    id: number;
    status: Status;
    type: SensorType;
    label: string;
    statistics: Statistics;
    parentId: number;
    statusUpdatedAt: string;
};
export declare type SeriePoint = {
    time: number;
    latency: number;
    status: Status;
};
export declare type StatusCheck = {
    statusCode: string;
    body: string;
};
export declare type DeviceToken = {
    id: number;
    token: string;
    type: 'IOS' | 'ANDROID';
};
export declare type CommentCategory = {
    id: number;
    label: string;
};
export declare type WeatherType = 0 | 1 | 2;
export declare type SensorPreferences = {
    id: number;
    favorite: 0 | 1 | 2;
    notifications: 0 | 1 | 2;
    sensorId: number;
    locked: boolean;
    follow: 0 | 1;
};
export declare type User = {
    id: number;
    lastName: string;
    firstName: string;
    email: string;
    phone: string;
    silent: boolean;
};
export declare type RegisterForm = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
};
export declare type Comment = {
    id: number;
    userId: number;
    issueId: number;
    content: string;
    categoryId: number;
    createdAt: string;
};
export declare type MeteoSubType = 5 | 6 | 7;
export declare type MeteoType = SensorType | MeteoSubType;
export declare const dataTypeText: (t?: number | undefined) => "" | "domaine" | "application" | "sonde" | "accueil" | "listes" | "incidents";
