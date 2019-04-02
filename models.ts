export type Token = string


export const DOMAIN = 0
export const APP = 1
export const SENSOR = 2

export type Status = 'OK' | 'KO' | 'HANDLED'

export type EndpointIssue = {
    id: number,
    body: string,
    createdAt: string,
    responsibleId: number | null,
    sensorId: number,
    statusCode: number,
    updatedAt: string,
}

export type Group = {
    id: number,
    name: string,
    sensors: number[],
}

export type Statistics = {
    day: number,
    week: number,
    month: number,
    latency: number,
}

export type SensorType = 0 | 1 | 2

export type Sensor = {
    id: number,
    status: Status,
    type: SensorType,
    label: string,
    statistics: Statistics,
    parentId: number,
    statusUpdatedAt: string,
}

export type SeriePoint = {
    time: number,
    latency: number,
    status: Status,
}

export type Issue = {
    id: number,
    status: 'OPEN' | 'CLOSED',
    createdAt: string,
    resolvedAt: string,
    endpoints: number[],
    sensorId: number,
    endpointsInfo: EndpointIssue[],
}

export type StatusCheck = {
    statusCode: string,
    body: string,
}

export type DeviceToken = {
    id: number,
    token: string,
    type: 'IOS' | 'ANDROID',
}

export type CommentCategory = {
    id: number,
    label: string,
}

export type WeatherType = 0 | 1 | 2

export type SensorPreferences = {
    id: number,
    favorite: 0 | 1 | 2,
    notifications: 0 | 1 | 2, // 0 disabled, 1 only at resolution, 2 enabled
    sensorId: number,
    locked: boolean,
    follow: 0 | 1,
}

export type User = {
    id: number,
    lastName: string,
    firstName: string,
    email: string,
    phone: string,
    silent: boolean,
}

export type RegisterForm = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
}

export type Comment = {
    id: number,
    userId: number,
    issueId: number,
    content: string,
    categoryId: number,
    createdAt: string,
}

export type MeteoSubType =
    5 // 'accueil'
    | 6 // 'listes'
    | 7 // 'incidents'

export type MeteoType = SensorType | MeteoSubType

export const dataTypeText = (t?: number) => {
    switch (t) {
        case 0: return 'domaine'
        case 1: return 'application'
        case 2: return 'sonde'
        case 5: return 'accueil'
        case 6: return 'listes'
        case 7: return 'incidents'
        default: return ''
    }
}


export type Service = {
    id: number,
    name: string,
    environment: string
}

export type Application = {
    id: number,
    name: string,
    services: Service[]
}

export type Bloc = {
    id: number,
    title: string,
    autoBlock: boolean
}

export type View = {
    id: number,
    name: string,
    teamId: number,
    blocs: Bloc[],
}

export type Team = {
    id: number,
    approved: boolean,
    name: string
}
