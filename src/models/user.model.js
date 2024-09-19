import mongoose from "mongoose";
const userCollection = "Users";


//se define usuarios agregando cart y role como parametros del modelo
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    age: Number,
    password: String,
    cart: { type: String, default: "cartId" },
    role: { type: String, default:"User"}
});

const firstCollection = mongoose.model(userCollection, userSchema);

export default firstCollection