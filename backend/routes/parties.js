import express from 'express';

const router = express.Router();

import partyController from '../controllers/partyController.js';

import checkToken from '../helpers/check-token.js';

//Funções
//POST
router
    .route('/party')
    .post(checkToken,(req, res) => partyController.create(req, res));

//GET(Todos os eventos)
router
    .route('/party')
    .get(checkToken,(req, res) => partyController.getAll(req, res));

//GET(Uma festa especifica)

router
    .route('/party/:id')
    .get(checkToken,(req, res) => partyController.get(req, res));

//DELETE(Deleta uma festa pelo "id")
router
    .route('/party/:id')
    .delete(checkToken,(req, res) => partyController.delete(req, res));

//PUT(Atualiza uma festa pelo "id")
router
    .route('/party/:id')
    .put(checkToken,(req, res) => partyController.update(req, res));

export default router;