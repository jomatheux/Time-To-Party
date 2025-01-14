import express from 'express';
import cors from 'cors';
import { Service } from './models/Service.js';
import fs from 'fs';
const servicesmock = JSON.parse(fs.readFileSync('./db/servicesmock.json', 'utf-8'));
//DB Connection
import conn from './db/conn.js';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());


//Iniciando conexão com o Banco de dados
conn();

// Importando rotas
import routes from './routes/router.js';

app.use("/api", routes);

//Mock de dados
Service.createCollection = function(){
    this.insertMany(servicesmock);
}
Service.createCollection();

app.listen(process.env.PORT,()=>{
    console.log('Servidor online...');       
});

if (process.env.NODE_ENV === 'development') {
    console.log("Estamos no ambiente de desenvolvimento!");
}
