import express from 'express';
import cors from 'cors';
//DB Connection
import conn from './db/conn.js';

const app = express();
app.use(cors());
app.use(express.json());
//Iniciando conexão com o Banco de dados
conn();

// Importando rotas
import routes from './routes/router.js';

app.use("/api", routes);


app.listen(3000,()=>{
    console.log('Servidor online...');
});