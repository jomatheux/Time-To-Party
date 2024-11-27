import express from 'express';
const router = express.Router();
//Rotas de serviços
import servicesRouter from './services.js';
router.use("/", servicesRouter);

//Rotas de festas
import partyRouter from './parties.js';
router.use("/", partyRouter);



export default router;