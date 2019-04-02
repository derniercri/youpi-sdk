"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./models"));
exports.filterUp = function (items) { return status(items, 'OK'); };
exports.filterDown = function (items) { return status(items, 'KO'); };
var status = function (items, statusParam) { return items.filter(function (item) { return item.status === statusParam; }); };
var Sdk = /** @class */ (function () {
    function Sdk(url) {
        var _this = this;
        this.setToken = function (token) {
            _this.token = token;
        };
        this.login = function (user, password) { return fetch(_this.url + "/api/token", {
            body: JSON.stringify({ user: user, password: password }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            mode: _this.createMode(),
        }).then(function (res) { return _this.resHandler(res); }); };
        this.createHeaders = function (token) { return ({
            'Authorization': "Bearer " + token,
            'Content-Type': 'application/json',
        }); };
        this.createMode = function () { return ('cors'); };
        this.createPreferences = function (preferences) {
            return fetch(_this.url + "/api/v1/preferences", {
                body: JSON.stringify(preferences),
                headers: _this.createHeaders(_this.token),
                method: 'POST',
                mode: _this.createMode(),
            });
        };
        this.updatePreSensorferences = function (preferences) {
            return fetch(_this.url + "/api/v1/preferences/" + preferences.id, {
                body: JSON.stringify(preferences),
                headers: _this.createHeaders(_this.token),
                method: 'PUT',
                mode: _this.createMode(),
            });
        };
        this.updateUser = function (user) {
            var body = JSON.stringify(user);
            return fetch(_this.url + "/api/v1/users/" + user.id, {
                body: body,
                headers: _this.createHeaders(_this.token),
                method: 'PUT',
                mode: _this.createMode(),
            }).then(function (res) { return _this.resHandler(res); });
        };
        this.getUser = function (userId) { return fetch(_this.url + "/api/v1/users/" + userId, {
            headers: _this.createHeaders(_this.token),
            mode: _this.createMode(),
        }).then(function (res) { return _this.resHandler(res); }); };
        this.comments = function (issueId) { return fetch(_this.url + "/api/v1/issues/" + issueId + "/comments", {
            headers: _this.createHeaders(_this.token),
            mode: _this.createMode(),
        }).then(function (res) { return _this.resHandler(res); }); };
        this.sensors = function (viewId) { return fetch(_this.url + "/api/v1/sensors?view_id=" + viewId, {
            headers: _this.createHeaders(_this.token),
            mode: _this.createMode(),
        }).then(function (res) { return _this.resHandler(res); }); };
        this.endpointIssue = function (endpointId) { return fetch(_this.url + "/api/v1/endpointissues/" + endpointId, {
            headers: _this.createHeaders(_this.token),
            mode: _this.createMode(),
        }).then(function (res) { return _this.resHandler(res); }); };
        this.sensorCheck = function (id) { return fetch(_this.url + "/api/v1/sensors/" + id + "/check", {
            headers: _this.createHeaders(_this.token),
            mode: _this.createMode(),
        }).then(function (res) { return _this.resHandler(res); }); };
        this.issues = function (viewId, stat) {
            return fetch(_this.url + "/api/v1/issues?view_id?" + viewId + "&status=" + stat, {
                headers: _this.createHeaders(_this.token),
                mode: _this.createMode(),
            }).then(function (res) { return _this.resHandler(res); });
        };
        this.updateIssue = function (issue) {
            return fetch(_this.url + "/api/v1/issues/" + issue.id, {
                body: JSON.stringify(issue),
                headers: _this.createHeaders(_this.token),
                method: 'PUT',
                mode: _this.createMode(),
            });
        };
        this.updateEndpointIssue = function (endpointIssue) {
            return fetch(_this.url + "/api/v1/endpointissues/" + endpointIssue.id, {
                body: JSON.stringify(endpointIssue),
                headers: _this.createHeaders(_this.token),
                method: 'PUT',
                mode: _this.createMode(),
            });
        };
        this.sensorsPreferences = function () { return fetch(_this.url + "/api/v1/preferences", {
            headers: _this.createHeaders(_this.token),
            mode: _this.createMode(),
        }).then(function (res) { return _this.resHandler(res); }); };
        this.commentCategories = function () { return fetch(_this.url + "/api/v1/comments-categories", {
            headers: _this.createHeaders(_this.token),
            mode: _this.createMode(),
        }).then(function (res) { return _this.resHandler(res); }); };
        this.users = function () { return fetch(_this.url + "/api/v1/users", {
            headers: _this.createHeaders(_this.token),
            mode: _this.createMode(),
        }).then(function (res) { return _this.resHandler(res); }); };
        this.owners = function (userId) { return fetch(_this.url + "/api/v1/sensors/" + userId + "/owners", {
            headers: _this.createHeaders(_this.token),
            mode: _this.createMode(),
        }).then(function (res) { return _this.resHandler(res); }); };
        this.createDeviceToken = function (device, type) {
            var body = JSON.stringify({ token: device, type: type });
            return fetch(_this.url + "/api/v1/devices", {
                body: body,
                headers: _this.createHeaders(_this.token),
                method: 'POST',
                mode: _this.createMode(),
            }).then(function (res) { return _this.resHandler(res); });
        };
        this.updatePreferences = function (preferences) { return preferences.id > 0 ?
            _this.updatePreSensorferences(preferences) : _this.createPreferences(preferences); };
        this.getSeries = function (id, start, stop) {
            return fetch(_this.url + "/api/v1/sensors/" + id + "/data?start=" + start.toISOString() + "&stop=" + stop.toISOString(), {
                headers: _this.createHeaders(_this.token),
                mode: _this.createMode(),
            }).then(function (res) { return _this.resHandler(res); });
        };
        this.register = function (userForm) { return fetch(_this.url + "/api/v1/users", {
            body: JSON.stringify(userForm),
            headers: _this.createHeaders(_this.token),
            method: 'POST',
            mode: _this.createMode(),
        }).then(function (res) { return _this.resHandler(res); }); };
        this.createOwner = function (sensorId, userId) {
            return fetch(_this.url + "/api/v1/sensors/" + sensorId + "/owners", {
                body: JSON.stringify({ userId: userId }),
                headers: _this.createHeaders(_this.token),
                method: 'POST',
                mode: _this.createMode(),
            }).then(function (res) { return _this.resHandler(res); });
        };
        this.createComment = function (issueId, categoryId, content) {
            return fetch(_this.url + "/api/v1/issues/" + issueId + "/comments", {
                body: JSON.stringify({ categoryId: categoryId, content: content }),
                headers: _this.createHeaders(_this.token),
                method: 'POST',
                mode: _this.createMode(),
            }).then(function (res) { return _this.resHandler(res); });
        };
        this.views = function () { return fetch(_this.url + "/api/v1/views", {
            headers: _this.createHeaders(_this.token),
            mode: _this.createMode(),
        }).then(function (res) { return _this.resHandler(res); }); };
        this.view = function (id) { return fetch(_this.url + "/api/v1/views/" + id, {
            headers: _this.createHeaders(_this.token),
            mode: _this.createMode(),
        }).then(function (res) { return _this.resHandler(res); }); };
        this.viewsByTeam = function (teamId) { return fetch(_this.url + "/api/v1/teams/" + teamId + "/views", {
            headers: _this.createHeaders(_this.token),
            mode: _this.createMode(),
        }).then(function (res) { return _this.resHandler(res); }); };
        this.memberTeams = function (member) { return fetch(_this.url + "/api/v1/members/" + member + "/teams", {
            headers: _this.createHeaders(_this.token),
            mode: _this.createMode(),
        }).then(function (res) { return _this.resHandler(res); }); };
        this.url = url;
    }
    Sdk.prototype.onTokenExpired = function (cb) {
        this.tokenExpiredCb = cb;
    };
    Sdk.prototype.resHandler = function (res) {
        if (res.status === 401) {
            if (this.onTokenExpired) {
                this.tokenExpiredCb();
            }
        }
        return res.json();
    };
    return Sdk;
}());
exports.default = Sdk;
var sdk = new Sdk('');
exports.initSdk = function (url) { return sdk = new Sdk(url); };
exports.getSdk = function () { return sdk; };
