import express from 'express';
import servicesRouter from './services.js';
const router = express.Router();

router.use("/", servicesRouter);


export default router;