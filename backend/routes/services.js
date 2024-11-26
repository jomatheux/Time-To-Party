import express from 'express';

const router = express.Router();

import serviceController from '../controllers/serviceController.js';

//Funções

//POST
router
    .route("/services")
    .post((req, res) => serviceController.create(req, res));

//GET(Todos os serviços)
router
    .route("/services")
    .get((req, res) => serviceController.getAll(req, res));

//GET(serviço único)
router
    .route("/services/:id")
    .get((req, res) => serviceController.get(req, res));

//Delete(deletando pelo "id")
router
    .route("/services/:id")
    .delete((req, res) => serviceController.delete(req, res));

//PUT(atualizando pelo "id")
router
    .route("/services/:id")
    .put((req, res) => serviceController.update(req, res));





export default router;