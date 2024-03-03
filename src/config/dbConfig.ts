import * as dotenv from 'dotenv';

dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import sql from "mssql/msnodesqlv8";


const config = {
  server: "UZIEL\\SQLEXPRESS",
  user: "sa",
  password: "225699Uz",
  database: "BD_L_ART_GARDEN_pre",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const poolExport = new sql.ConnectionPool(config);
const poolConnect = poolExport.connect();

poolConnect.then(() => {
 
  console.log("Conexión exitosa a SQL Server");
  
});

export{poolExport};
