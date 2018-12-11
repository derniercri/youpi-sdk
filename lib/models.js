"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOMAIN = 0;
exports.APP = 1;
exports.SENSOR = 2;
exports.dataTypeText = function (t) {
    switch (t) {
        case 0: return 'domaine';
        case 1: return 'application';
        case 2: return 'sonde';
        case 5: return 'accueil';
        case 6: return 'listes';
        case 7: return 'incidents';
        default: return '';
    }
};
