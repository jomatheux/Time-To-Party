import { response } from "express";
import Party from "../models/Party.js";
import mongoose from "mongoose";

const checkPartyBudget = (budget, services) =>{
    const priceSum = services.reduce((sum, service) => sum + service.price, 0);

    if(priceSum > budget) return false;

    return true;

}

const partyController = {
    // Função para criar party
    create: async (req, res) =>{
        try {
            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services
            }

            if(party.services && !checkPartyBudget(party.budget, party.services)){
                res.status(406).json({msg: "O seu orçamento é insuficiente"});
                return;
            }

            const response = await Party.create(party);

            res.status(201).json({response ,msg: 'Festa criada com sucesso' });

        } catch (error) {
            console.log(error);
        }
    },
    // Função para resgatar todas as festas
    getAll: async (req, res) =>{
        try {
            const parties = await Party.find();
            res.status(200).json({parties ,msg:"Dados de festas recuperados com sucesso!"})
        } catch (error) {
            console.log(error);
        }
    },

    // Função para resgatar uma festa pelo ID
    get: async (req, res) => {
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

            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services
            }

            if(party.services &&!checkPartyBudget(party.budget, party.services)){
                res.status(406).json({msg: "O seu orçamento é insuficiente"});
                return;
            }

            const updatedParty = await Party.findByIdAndUpdate(id, party);

            if (!updatedParty) {
                res.status(404).json({ msg: "Festa não encontrada." });
                return;
            }

            res.status(200).json({party, msg: "Dados da festa atualizados com sucesso!"});

        } catch (error) {
            console.log(error);
        }
    }
}

export default partyController;