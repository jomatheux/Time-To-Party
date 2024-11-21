import express from 'express';
import cors from 'cors';
//DB Connection
import conn from './db/conn.js';

const app = express();
app.use(cors());
app.use(express.json());
//Iniciando conexão com o Banco de dados
conn();

app.listen(3000,()=>{
    console.log('Servidor online...');
});