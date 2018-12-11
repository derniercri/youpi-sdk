import * as moment from 'moment'

import {
    Sensor,
    Token,
    SensorPreferences,
    User,
    Group,
    Issue,
    EndpointIssue,
    StatusCheck,
    CommentCategory,
    DeviceToken,
    SeriePoint,
    RegisterForm
} from './models'

export * from './models'

export type TokenRes = {
    token?: string,
    message?: string,
}

export const filterUp = (items: Sensor[]) => status(items, 'OK')
export const filterDown = (items: Sensor[]) => status(items, 'KO')
const status = (items: Sensor[], statusParam: 'OK' | 'KO') => items.filter((item) => item.status === statusParam)

export default class Sdk {

    public url: string

    public token: string

    private tokenExpiredCb: () => void

    constructor(url: string) {
        this.url = url
    }

    public onTokenExpired(cb: () => void) {
        this.tokenExpiredCb = cb
    }

    public resHandler(res: Response): any {
        if (res.status === 401) {
            if (this.onTokenExpired) { this.tokenExpiredCb() }
        }

        return res.json()
    }

    public setToken = (token: string) => {
        this.token = token
    }

    public login = (user: string, password: string): Promise<TokenRes> => fetch(`${this.url}/api/token`, {
        body: JSON.stringify({ user, password }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
    }).then((res) => this.resHandler(res))

    public createHeaders = (token: Token) => ({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    })

    public createPreferences = (preferences: SensorPreferences) =>
        fetch(`${this.url}/api/v1/preferences`, {
            body: JSON.stringify(preferences),
            headers: this.createHeaders(this.token),
            method: 'POST',
        })

    public updatePreSensorferences = (preferences: SensorPreferences) =>
        fetch(`${this.url}/api/v1/preferences/${preferences.id}`, {
            body: JSON.stringify(preferences),
            headers: this.createHeaders(this.token),
            method: 'PUT',
        })

    public groups = (): Promise<Group[]> =>
        fetch(`${this.url}/api/v1/groups`, {
            headers: this.createHeaders(this.token),
        }).then((res) => this.resHandler(res))

    public updateUser = (user: User): Promise<User> => {
        const body = JSON.stringify(user)
        return fetch(`${this.url}/api/v1/users/${user.id}`, {
            body,
            headers: this.createHeaders(this.token),
            method: 'PUT',
        }).then((res) => this.resHandler(res))
    }

    public getUser = (userId: string): Promise<User> => fetch(`${this.url}/api/v1/users/${userId}`, {
        headers: this.createHeaders(this.token),
    }).then((res) => this.resHandler(res))

    public comments = (issueId: number): Promise<Comment[]> => fetch(`${this.url}/api/v1/issues/${issueId}/comments`, {
        headers: this.createHeaders(this.token),
    }).then((res) => this.resHandler(res))

    public sensors = (groupId: number): Promise<Sensor[]> => fetch(`${this.url}/api/v1/groups/${groupId}/sensors`, {
        headers: this.createHeaders(this.token),
    }).then((res) => this.resHandler(res))

    public sensorCheck = (id: number): Promise<StatusCheck> => fetch(`${this.url}/api/v1/sensors/${id}/check`, {
        headers: this.createHeaders(this.token),
    }).then((res) => this.resHandler(res))

    public issues = (groupId: number, stat: string): Promise<Issue[]> =>
        fetch(`${this.url}/api/v1/groups/${groupId}/issues?status=${stat}`, {
            headers: this.createHeaders(this.token),
        }).then((res) => this.resHandler(res))

    public updateIssue = (issue: Issue) =>
        fetch(`${this.url}/api/v1/issues/${issue.id}`, {
            body: JSON.stringify(issue),
            headers: this.createHeaders(this.token),
            method: 'PUT',
        })

    public updateEndpointIssue = (endpointIssue: EndpointIssue) =>
        fetch(`${this.url}/api/v1/endpointissues/${endpointIssue.id}`, {
            body: JSON.stringify(endpointIssue),
            headers: this.createHeaders(this.token),
            method: 'PUT',
        })

    public sensorsPreferences = (): Promise<SensorPreferences[]> => fetch(`${this.url}/api/v1/preferences`, {
        headers: this.createHeaders(this.token),
    }).then((res) => this.resHandler(res))

    public commentCategories = (): Promise<CommentCategory[]> => fetch(`${this.url}/api/v1/comments-categories`, {
        headers: this.createHeaders(this.token),
    }).then((res) => this.resHandler(res))

    public users = (): Promise<User[]> => fetch(`${this.url}/api/v1/users`, {
        headers: this.createHeaders(this.token),
    }).then((res) => this.resHandler(res))

    public owners = (userId: number): Promise<User[]> => fetch(`${this.url}/api/v1/sensors/${userId}/owners`, {
        headers: this.createHeaders(this.token),
    }).then((res) => this.resHandler(res))

    public createDeviceToken = (device: string, type: 'IOS' | 'ANDROID'): Promise<DeviceToken> => {
        const body = JSON.stringify({ token: device, type })
        return fetch(`${this.url}/api/v1/devices`, {
            body,
            headers: this.createHeaders(this.token),
            method: 'POST',
        }).then((res) => this.resHandler(res))
    }

    public updatePreferences = (preferences: SensorPreferences) => preferences.id > 0 ?
        this.updatePreSensorferences(preferences) : this.createPreferences(preferences)

    public getSeries = (id: number, start: moment.Moment, stop: moment.Moment): Promise<SeriePoint[]> =>
        fetch(`${this.url}/api/v1/sensors/${id}/data?start=${start.toISOString()}&stop=${stop.toISOString()}`, {
            headers: this.createHeaders(this.token),
        }).then((res) => this.resHandler(res))

    public register = (userForm: RegisterForm): Promise<User> => fetch(`${this.url}/api/v1/users`, {
        body: JSON.stringify(userForm),
        headers: this.createHeaders(this.token),
        method: 'POST',
    }).then((res) => this.resHandler(res))

    public createOwner = (sensorId: number, userId: number): Promise<User> =>
        fetch(`${this.url}/api/v1/sensors/${sensorId}/owners`, {
            body: JSON.stringify({ userId }),
            headers: this.createHeaders(this.token),
            method: 'POST',
        }).then((res) => this.resHandler(res))

    public createComment = (issueId: number, categoryId: number, content: string) =>
        fetch(`${this.url}/api/v1/issues/${issueId}/comments`, {
            body: JSON.stringify({ categoryId, content }),
            headers: this.createHeaders(this.token),
            method: 'POST',
        }).then((res) => this.resHandler(res))
}

let sdk = new Sdk('')
export const initSdk = (url: string) => sdk = new Sdk(url)
export const getSdk = () => sdk
