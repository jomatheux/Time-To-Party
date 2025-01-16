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

async function initializeDatabase() {
    try {
        const collectionExists = await Service.exists({}); // Verifica se já existem documentos na coleção

        if (!collectionExists) { // Cria a coleção apenas se ela estiver vazia
            console.log("Criando coleção de serviços...");
            await Service.insertMany(servicesmock); 
            console.log("Coleção de serviços criada com sucesso!");
        } else {
            console.log("Coleção de serviços já existe. Pulando a criação.");
        }
    } catch (error) {
        console.error("Erro ao inicializar o banco de dados:", error);
    }
}

initializeDatabase(); // Executa a função para inicializar o banco de dados

app.listen(process.env.PORT,()=>{
    console.log('Servidor online...');       
});

if (process.env.NODE_ENV === 'development') {
    console.log("Estamos no ambiente de desenvolvimento!");
}
