import mongoose from "mongoose";

const {Schema} = mongoose;

import serviceSchema from "./Service"

const userSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    descrption:{
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
    }
},{timestamps: true});

const User = mongoose.model("User", userSchema);

export {User, userSchema};