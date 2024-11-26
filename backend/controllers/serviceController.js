import { response } from 'express';
import { Service as ServiceModel } from '../models/Service.js';
import mongoose from 'mongoose';

const serviceController = {

    // Função para criar service
    create: async (req, res) => {
        try {

            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image
            }

            const response = await ServiceModel.create(service);

            res.status(201).json({ response, msg: 'Serviço criado com sucesso' });

        } catch (error) {
            console.log(error);
        }
    },

    // Função para listar todos os services
    getAll: async (req, res) => {
        try {
            const response = await ServiceModel.find();

            res.status(200).json({ response, msg: 'Todos os serviços recuperados com sucesso' });
        } catch (error) {
            console.log(error);
        }
    },

    // Função para buscar um service pelo id
    get: async (req, res) => {
        try {

            const { id } = req.params;
            
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg: 'ID inválido' });
            }

            const response = await ServiceModel.findById(req.params.id);

            if (!response) {
                res.status(404).json({ msg: "Serviço não encontrado." });
                return;
            }

            res.status(200).json({ response, msg: "Serviço recuperado com sucesso" });
        } catch (error) {
            console.log(error);
        }
    },

    //Função para deletar um serviço pelo ID

    delete: async(req, res) => {
        try {
            const id = req.params.id;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg: 'ID inválido' });
            }

            const response = await ServiceModel.findByIdAndDelete(id);
            
            if (!response) {
                res.status(404).json({ msg: "Serviço não encontrado." });
                return;
            }

            res.status(200).json({response, msg:"Serviço deletado com sucesso."});
        } catch (error) {
            console.log(error);
        }
    },

    // Função para atualizar um serviço pelo id, passando o serviço no body da requisição

    update: async(req , res) => {
        try {
            const id = req.params.id;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg: 'ID inválido' });
            }

            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image
            };

            const updatedService = await ServiceModel.findByIdAndUpdate(id, service);

            if (!updatedService) {
                res.status(404).json({ msg: "Serviço não encontrado." });
                return;
            }

            res.status(200).json({updatedService, msg: "Serviço atualizado com sucesso."});


        } catch (error) {
            console.log(error);
        }
    }



}

export default serviceController;