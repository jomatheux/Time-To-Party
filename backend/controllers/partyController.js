import { response } from "express";
import Party from "../models/Party.js";

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
                res.status(406).json({message: "O seu orçamento é insuficiente"});
                return;
            }

            const response = await Party.create(party);

            res.status(201).json({response ,message: 'Festa criada com sucesso' });

        } catch (error) {
            console.log(error);
        }
    },
    // Função para resgatar todas as festas
    getAll: async (req, res) =>{
        try {
            const response = await Party.find();
            res.status(200).json({response ,message:"Dados de festas recuperados com sucesso!"})
        } catch (error) {
            console.log(error);
        }
    }
}

export default partyController;