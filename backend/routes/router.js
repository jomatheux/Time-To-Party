import express from 'express';
const router = express.Router();
//Rotas de serviços
import servicesRouter from './services.js';
router.use("/", servicesRouter);

//Rotas de festas
import partyRouter from './parties.js';
router.use("/", partyRouter);

//Rotas de usuários
import userRouter from './user.js';
router.use("/", userRouter);



export default router;