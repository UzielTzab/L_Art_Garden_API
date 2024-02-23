"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.poolExport = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const msnodesqlv8_1 = __importDefault(require("mssql/msnodesqlv8"));
const config = {
    server: "UZIEL\\SQLEXPRESS",
    user: "sa",
    password: "225699Uz",
    database: "BD_L_ART_GARDEN",
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};
const poolExport = new msnodesqlv8_1.default.ConnectionPool(config);
exports.poolExport = poolExport;
const poolConnect = poolExport.connect();
poolConnect.then(() => {
    console.log("Conexión exitosa a SQL Server");
});
