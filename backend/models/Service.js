import mongoose from "mongoose";

const {Schema} = mongoose;

const serviceSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
}, {timestamps: true});

const Service = mongoose.model('Service',serviceSchema);

export default {Service, serviceSchema};