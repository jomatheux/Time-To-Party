import express from 'express';

const router = express.Router();

import serviceController from '../controllers/serviceController.js';

//Funções

//POST
router
    .route("/services")
    .post((req, res) => serviceController.create(req, res));



export default router;