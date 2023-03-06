"use strict";
exports.__esModule = true;
exports.db = void 0;
var client_1 = require("@prisma/client");
var db;
exports.db = db;
if (!global.__db) {
    global.__db = new client_1.PrismaClient();
}
exports.db = db = global.__db;
