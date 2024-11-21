import mongoose from "mongoose";

async function main() {
    try {

        mongoose.set("strictQuery", true);
        // Connect to MongoDB
        await mongoose.connect("mongodb+srv://jomatheux:LH.enMuGntF.j34@cluster0.nqao4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

        console.log("Conectou com o banco")
        
    } catch (error) {
        console.log(error);
    }
}

export default main;