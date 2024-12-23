import { response } from "express";
import { Party } from "../models/Party.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";

const checkPartyBudget = (budget, services) => {
    const priceSum = services.reduce((sum, service) => sum + service.price, 0);

    if (priceSum > budget) return false;

    return true;

}

const partyController = {
    // Função para criar party
    create: async (req, res) => {
        try {

            const token = getToken(req);

            if (!token) {
                res.status(401).json({ msg: "Token inválido" });
                return;
            }

            const user = await getUserByToken(token);

            if (!user) {
                res.status(401).json({ msg: "Token inválido" });
                return;
            }

            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services,
                user: {
                    _id: user._id,
                    name: user.name,
                    image: user.image,
                    phone: user.phone,
                },
            }

            if (party.services && !checkPartyBudget(party.budget, party.services)) {
                res.status(406).json({ msg: "O seu orçamento é insuficiente" });
                return;
            }

            const response = await Party.create(party);

            res.status(201).json({ response, msg: 'Festa criada com sucesso' });

        } catch (error) {
            console.log(error);
        }
    },
    // Função para resgatar todas as festas do usuário
    getAll: async (req, res) => {
        try {
            const token = getToken(req)

            if (!token) {
                res.status(401).json({ msg: "Token inválido" });
                return;
            }

            const user = await getUserByToken(token)

            if (!user) {
                res.status(401).json({ msg: "Token inválido" });
                return;
            }

            const parties = await Party.find({ 'user._id': user._id });
            res.status(200).json({ parties, msg: "Dados de festas recuperados com sucesso!" })
        } catch (error) {
            console.log(error);
        }
    },

    // Função para resgatar uma festa pelo ID do usuário
    get: async (req, res) => {
        try {
            const id = req.params.id;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg: 'ID inválido' });
            }

            const token = getToken(req)

            if (!token) {
                res.status(401).json({ msg: "Token inválido" });
                return;
            }
            const user = await getUserByToken(token)
            if (!user) {
                res.status(401).json({ msg: "Token inválido" });
                return;
            }

            const party = await Party.findById(id);

            if (!party) {
                res.status(404).json({ msg: "Festa não encontrada." });
                return;
            }

            if (party.user._id.toString() != user._id.toString()) {
                res.status(404).json({
                    message:
                        'Houve um problema em processar sua solicitação, tente novamente mais tarde!',
                })
                return
            }

            res.status(200).json({ party, msg: "Festa recuperada com sucesso" });
        } catch (error) {
            console.log(error);
        }
    },
    // Função para deletar uma festa
    delete: async (req, res) => {
        try {
            const id = req.params.id;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg: 'ID inválido' });
            }

            const party = await Party.findById(id);

            if (!party) {
                res.status(404).json({ msg: "Festa não encontrada." });
                return;
            }

            const token = getToken(req)

            if (!token) {
                res.status(401).json({ msg: "Token inválido" });
                return;
            }
            const user = await getUserByToken(token)

            if (!user) {
                res.status(401).json({ msg: "Token inválido" });
                return;
            }

            if (party.user._id.toString() != user._id.toString()) {
                res.status(404).json({
                    message:
                        'Houve um problema em processar sua solicitação, tente novamente mais tarde!',
                })
                return
            }

            const deletedParty = await Party.findByIdAndDelete(id);

            res.status(200).json({ deletedParty, msg: "Festa deletada com sucesso." });
        } catch (error) {
            console.log(error)
        }
    },

    // Função para atualizar uma festa passando o id
    update: async (req, res) => {
        try {
            const id = req.params.id;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg: 'ID inválido' });
            }

            const token = getToken(req)

            if (!token) {
                res.status(401).json({ msg: "Token inválido" });
                return;
            }
            const user = await getUserByToken(token)

            if (!user) {
                res.status(401).json({ msg: "Token inválido" });
                return;
            }

            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services,
                user: {
                    _id: user._id,
                    name: user.name,
                    image: user.image,
                    phone: user.phone,
                },
            }

            if (party.services && !checkPartyBudget(party.budget, party.services)) {
                res.status(406).json({ msg: "O seu orçamento é insuficiente" });
                return;
            }

            const updatedParty = await Party.findByIdAndUpdate(id, party);

            if (!updatedParty) {
                res.status(404).json({ msg: "Festa não encontrada." });
                return;
            }

            res.status(200).json({ party, msg: "Dados da festa atualizados com sucesso!" });

        } catch (error) {
            console.log(error);
        }
    }
}

export default partyController;