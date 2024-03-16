import * as dotenv from 'dotenv';

dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import sql from "mssql";
import { env } from 'process';

const config = {
  server: process.env.SERVE || 'localhost',
  user: process.env.USER || 'sa',
  password: process.env.PASSWORD || '225699Uz',
  database: process.env.DB_DATABASE || 'BD_L_ART_GARDEN',
  options: {
    encrypt: false,
    trustServerCertificate: false,
  
  },
};


const poolExport = new sql.ConnectionPool(config);
const poolConnect = poolExport.connect();

poolConnect.then(() => {
 
  console.log(`Conexión exitosa a SQL Server:`);
  
});

export{poolExport};
