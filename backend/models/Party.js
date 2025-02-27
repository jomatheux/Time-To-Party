import mongoose from "mongoose";

const {Schema} = mongoose;

import {serviceSchema} from "./Service.js"

const partySchema = new Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    budget:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    services:{
        type: [serviceSchema]
    },
    user: Object,
},{timestamps: true});

const Party = mongoose.model("Party", partySchema);

export {Party, partySchema};