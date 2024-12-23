import mongoose from "mongoose";
const {Schema} = mongoose;
import { partySchema } from "./Party.js"


const userSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        phone: {
            type: String,
        },
    }, { timestamps: true });

const User = mongoose.model("User",userSchema);

export default User;