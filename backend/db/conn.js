import mongoose from "mongoose";
import "dotenv/config";

async function main() {
    try {

        mongoose.set("strictQuery", true);
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL);

        console.log("Conectou com o banco")
        
    } catch (error) {
        console.log(error);
    }
}

export default main;