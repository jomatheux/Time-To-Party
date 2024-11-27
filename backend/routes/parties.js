import express from 'express';

const router = express.Router();

import partyController from '../controllers/partyController.js';

//Funções
//POST
router
    .route('/party')
    .post((req, res) => partyController.create(req, res));

//GET(Todos os eventos)
router
    .route('/party')
    .get((req, res) => partyController.getAll(req, res));

export default router;