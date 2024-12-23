import express from 'express';
import cors from 'cors';
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


app.listen(process.env.PORT,()=>{
    console.log('Servidor online...');       
});

if (process.env.NODE_ENV === 'development') {
    console.log("Estamos no ambiente de desenvolvimento!");
}